<?php

namespace App\Enums;

enum SpamTypeEnum: int
{
    case COMMON = -1;

    case HAM = 0;
    case SPAM = 1;
    case AD = 2;
    case OTHER = 3;
}
