<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\SetSessionData;
use App\Http\Middleware\Timezone;
use App\Http\Middleware\Superadmin;
use App\Http\Middleware\Language;
use App\Http\Middleware\CheckUserLogin;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'Carbon' => 'Carbon\Carbon',
            // 'Charts' => ConsoleTVs\Charts\Facades\Charts::class,
            'DNS1D' => Milon\Barcode\Facades\DNS1DFacade::class,
            'DNS2D' => Milon\Barcode\Facades\DNS2DFacade::class,
            'Datatables' => Yajra\DataTables\Facades\DataTables::class,
            // 'Form' => Collective\Html\FormFacade::class,
            // 'Html' => Collective\Html\HtmlFacade::class,
            // 'Paystack' => Unicodeveloper\Paystack\Facades\Paystack::class,
            'Redis' => Illuminate\Support\Facades\Redis::class,
            // 'Menu' => Nwidart\Menus\Facades\Menu::class,
            
            'timezone' => Timezone::class,
            'SetSessionData' => SetSessionData::class,
            'superadmin' => Superadmin::class,
            'language' => Language::class,
            'CheckUserLogin' => CheckUserLogin::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
