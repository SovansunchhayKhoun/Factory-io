<?php

  return [

    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default filesystem disk that should be used
    | by the framework. The "local" disk, as well as a variety of cloud
    | based disks are available to your application. Just store away!
    |
    */

    'default' => env ( 'FILESYSTEM_DISK' , 'local' ) ,

    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    |
    | Here you may configure as many filesystem "disks" as you wish, and you
    | may even configure multiple disks of the same driver. Defaults have
    | been set up for each driver as an example of the required values.
    |
    | Supported Drivers: "local", "ftp", "sftp", "s3"
    |
    */

    'disks' => [

      'local' => [
        'driver' => 'local' ,
        'root' => storage_path ( 'app' ) ,
        'throw' => false ,
      ] ,

      'public' => [
        'driver' => 'local' ,
        'root' => storage_path ( 'app/public' ) ,
        'url' => env ( 'APP_URL' ) . '/storage' ,
        'visibility' => 'public' ,
        'throw' => false ,
      ] ,

      'products' => [
        'driver' => 'local' ,
        'root' => storage_path ( 'app/public/products' ) ,
        'url' => env ( 'APP_URL' ) . '/storage' ,
        'visibility' => 'public' ,
        'throw' => false ,
      ] ,
      'invoices' => [
        'driver' => 'local' ,
        'root' => storage_path ( 'app/public/invoices' ) ,
        'url' => env ( 'APP_URL' ) . '/storage' ,
        'visibility' => 'public' ,
        'throw' => false ,
      ] ,
      'messages' => [
        'driver' => 'local' ,
        'root' => storage_path ( 'app/public/messages' ) ,
        'url' => env ( 'APP_URL' ) . '/storage' ,
        'visibility' => 'public' ,
        'throw' => false ,
      ] ,

      'projects' => [
        'driver' => 'local' ,
        'root' => storage_path ( 'app/public/projects/' ) ,
        'url' => env ( 'APP_URL' ) . '/storage' ,
        'visibility' => 'public' ,
        'throw' => false ,
      ] ,

      'comments' => [
        'driver' => 'local' ,
        'root' => storage_path ( 'app/public/comments' ) ,
        'url' => env ( 'APP_URL' ) . '/storage' ,
        'visibility' => 'public' ,
        'throw' => false ,
      ] ,

      'donations' => [
        'driver' => 'local' ,
        'root' => storage_path ( 'app/public/donations/' ) ,
        'url' => env ( 'APP_URL' ) . '/storage' ,
        'visibility' => 'public' ,
        'throw' => false ,
      ] ,
      'fundings' => [
        'driver' => 'local' ,
        'root' => storage_path ( 'app/public/fundings/' ) ,
        'url' => env ( 'APP_URL' ) . '/storage' ,
        'visibility' => 'public' ,
        'throw' => false ,
      ] ,
      'backProjects' => [
        'driver' => 'local' ,
        'root' => storage_path ( 'app/public/backProjects/' ) ,
        'url' => env ( 'APP_URL' ) . '/storage' ,
        'visibility' => 'public' ,
        'throw' => false ,
      ] ,
      'reviews' => [
        'driver' => 'local' ,
        'root' => storage_path ( 'app/public/reviews/' ) ,
        'url' => env ( 'APP_URL' ) . '/storage' ,
        'visibility' => 'public' ,
        'throw' => false ,
      ] ,

//      'projectsImage' => [
//        'driver' => 'local' ,
//        'root' => storage_path ( 'app/public/projects/project/img' ) ,
//        'url' => env ( 'APP_URL' ) . '/storage' ,
//        'visibility' => 'public' ,
//        'throw' => false ,
//      ] ,
//
//      'projectsFile' => [
//        'driver' => 'local' ,
//        'root' => storage_path ( 'app/public/projects/project/src' ) ,
//        'url' => env ( 'APP_URL' ) . '/storage' ,
//        'visibility' => 'public' ,
//        'throw' => false ,
//      ] ,

      's3' => [
        'driver' => 's3' ,
        'key' => env ( 'AWS_ACCESS_KEY_ID' ) ,
        'secret' => env ( 'AWS_SECRET_ACCESS_KEY' ) ,
        'region' => env ( 'AWS_DEFAULT_REGION' ) ,
        'bucket' => env ( 'AWS_BUCKET' ) ,
        'url' => env ( 'AWS_URL' ) ,
        'endpoint' => env ( 'AWS_ENDPOINT' ) ,
        'use_path_style_endpoint' => env ( 'AWS_USE_PATH_STYLE_ENDPOINT' , false ) ,
        'throw' => false ,
      ] ,

    ] ,

    /*
    |--------------------------------------------------------------------------
    | Symbolic Links
    |--------------------------------------------------------------------------
    |
    | Here you may configure the symbolic links that will be created when the
    | `storage:link` Artisan command is executed. The array keys should be
    | the locations of the links and the values should be their targets.
    |
    */

    'links' => [
      public_path ( 'products' ) => storage_path ( 'app/public/products' ) ,
      public_path ( 'invoices' ) => storage_path ( 'app/public/invoices' ) ,
      public_path ( 'messages' ) => storage_path ( 'app/public/messages' ) ,
      public_path ( 'projects' ) => storage_path ( 'app/public/projects' ) ,
      public_path ( 'donations' ) => storage_path ( 'app/public/donations' ) ,
      public_path ( 'reviews' ) => storage_path ( 'app/public/reviews' ) ,
      public_path ( 'comments' ) => storage_path ( 'app/public/comments' ) ,
      public_path ( 'fundings' ) => storage_path ( 'app/public/fundings' ) ,
      public_path ( 'backProjects' ) => storage_path ( 'app/public/backProjects' ) ,
    ] ,

  ];
