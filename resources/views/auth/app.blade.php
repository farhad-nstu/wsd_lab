<!doctype html>
<html lang="en">

<head>

    <meta charset="utf-8" />
    <title>{{ env('APP_NAME') . ' | ' }} @yield('title')</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
    <meta content="Pichforest" name="author" />
    <!-- App favicon -->
    <link rel="shortcut icon" href="{{ asset('backend') }}/assets/images/favicon.ico">

    <!-- Bootstrap Css -->
    <link href="{{ asset('backend') }}/assets/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet"
        type="text/css" />
    <!-- Icons Css -->
    <link href="{{ asset('backend') }}/assets/css/icons.min.css" rel="stylesheet" type="text/css" />
    <!-- App Css-->
    <link href="{{ asset('backend') }}/assets/css/app.min.css" id="app-style" rel="stylesheet" type="text/css" />
    <!-- Dark Mode Css-->
    <link href="{{ asset('backend') }}/assets/css/dark-layout.min.css" id="app-style" rel="stylesheet"
        type="text/css" />
    @stack('style')
</head>

<body data-sidebar="dark">

    <!-- <body data-layout="horizontal" data-topbar="dark"> -->
    <div class="account-pages my-5 pt-sm-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-9 mx-md-0 border-0 rounded-lg">
                    <div class="card overflow-hidden">
                        <div class="row g-0 ">
                            <div class="col-lg-6">
                                <div class="p-lg-5 p-4">

                                    {{--  <div class="text-center">
                                        <a href="{{ env('APP_URL') }}">
                                            <img src="{{ asset('img/logo.jpg') }}"
                                                alt="" width="80%">
                                        </a>
                                    </div>  --}}

                                    <div class="mt-4 pt-3">
                                        @yield('body')
                                    </div>

                                </div>
                            </div>

                            <div class="col-lg-6">
                                <div class="d-flex flex-column h-100 justify-content-center text-center align-items-center pt-3 pt-md-0"
                                    style="background: #2E3192">
                                    <div class="bg-overlay">
                                        <a href="{{ env('APP_URL') }}">
                                            <img src="{{ asset('img/logo.jpg') }}"
                                                alt="image" class="img-fluid">
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- end col -->
            </div>
            <!-- end row -->
        </div>
        <!-- end container -->
    </div>
    <!-- end account page -->


    <!-- JAVASCRIPT -->
    <script src="{{ asset('backend') }}/assets/libs/jquery/jquery.min.js"></script>
    <script src="{{ asset('backend') }}/assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="{{ asset('backend') }}/assets/libs/metismenu/metisMenu.min.js"></script>
    <script src="{{ asset('backend') }}/assets/libs/simplebar/simplebar.min.js"></script>
    <script src="{{ asset('backend') }}/assets/libs/node-waves/waves.min.js"></script>

    <script src="{{ asset('backend') }}/assets/js/app.js"></script>

</body>

</html>
