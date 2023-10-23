<?php

namespace App\Repository\TrainSpamRepository;

interface TrainSpamRepositoryInterface
{
    public function getUserTrainModel(): mixed;

    public function getUserPaginateTrainModel(int $page = 1): mixed;
    public function setUser(int $userId): static;
    public function getUser(): int;
}
