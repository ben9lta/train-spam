<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('spam_messages', function (Blueprint $table) {
            $table->id();
            $table->json('request')->nullable();
            $table->text('text');
            $table->smallInteger('spam_type');
            $table->string('hashed_text', 32);
            $table->foreignId('user_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spam_messages');
    }
};
