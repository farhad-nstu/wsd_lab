<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8" />
    <title>{{ env('APP_NAME') . ' | ' }} @yield('title')</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
    <meta content="Pichforest" name="author" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- App favicon -->
    <link rel="shortcut icon" href="{{ asset('backend') }}/assets/images/favicon.ico">

    <link href="{{ asset('backend') }}/assets/libs/select2/css/select2.min.css" rel="stylesheet" type="text/css" />
    <link href="{{ asset('backend') }}/assets/libs/spectrum-colorpicker2/spectrum.min.css" rel="stylesheet"
        type="text/css">
    <link href="{{ asset('backend') }}/assets/libs/bootstrap-touchspin/jquery.bootstrap-touchspin.min.css"
        rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="{{ asset('backend') }}/assets/libs/%40chenfengyuan/datepicker/datepicker.min.css">

    <!-- flatpickr css -->
    <link href="{{ asset('backend') }}/assets/libs/flatpickr/flatpickr.min.css" rel="stylesheet">

    <link rel="stylesheet" href="{{ asset('backend') }}/assets/libs/%40chenfengyuan/datepicker/datepicker.min.css">
    <!-- DataTables -->
    <link href="{{ asset('backend') }}/assets/libs/datatables.net-bs4/css/dataTables.bootstrap4.min.css"
        rel="stylesheet" type="text/css" />
    <link href="{{ asset('backend') }}/assets/libs/datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css"
        rel="stylesheet" type="text/css" />
    <!-- Select datatable -->
    <link href="{{ asset('backend') }}/assets/libs/datatables.net-select-bs4/css/select.bootstrap4.min.css"
        rel="stylesheet" type="text/css" />
    <!-- Responsive datatable -->
    <link href="{{ asset('backend') }}/assets/libs/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css"
        rel="stylesheet" type="text/css" />
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

    <link href="{{ asset('backend') }}/assets/libs/datepicker/jquery-datepicker.min.css" rel="stylesheet">
    <style>
        .text {
            text-transform: uppercase;
            margin: 0 auto;
            /* background-image: linear-gradient(90deg, #db6f6f, #d68ee7); */
            color: #0576b9 !important;
            background-clip: text;
            -moz-background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            font-size: 25px;
        }

        /*
        * added for loder
        */

        #cover-spin {
            position: fixed;
            width: 100%;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: rgba(255, 255, 255, 0.7);
            z-index: 9999;
            display: none;
        }

        @-webkit-keyframes spin {
            from {
                -webkit-transform: rotate(0deg);
            }

            to {
                -webkit-transform: rotate(360deg);
            }
        }

        @keyframes spin {
            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }
        }

        #cover-spin::after {
            content: '';
            display: block;
            position: absolute;
            left: 48%;
            top: 40%;
            width: 40px;
            height: 40px;
            border-style: solid;
            border-color: #0D47A1;
            border-top-color: transparent;
            border-width: 4px;
            border-radius: 50%;
            -webkit-animation: spin .8s linear infinite;
            animation: spin .8s linear infinite;
        }
    </style>
    @stack('style')

</head>

<body data-sidebar="dark">

    <div id="layout-wrapper">
        <div id="cover-spin"></div>
        @include('layouts.inc.header')
        @include('layouts.inc.navbar')

        <!-- ============================================================== -->
        <!-- Start right Content here -->
        <!-- ============================================================== -->
        <div class="main-content">

            <div class="page-content">
                <div class="container-fluid">
                    <!-- start page title -->
                    @include('layouts.inc.start_page_title')
                    <!-- end page title -->
                    @yield('body')
                </div>
                <!-- container-fluid -->
            </div>
            <!-- End Page-content -->

            @include('layouts.inc.footer')

        </div>
        <!-- end main content-->

    </div>
    <!-- END layout-wrapper -->

    <!-- Right bar overlay-->
    <div class="rightbar-overlay"></div>

    <!-- JAVASCRIPT -->
    <script src="{{ asset('backend') }}/assets/libs/jquery/jquery.min.js"></script>
    <script src="{{ asset('backend') }}/assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="{{ asset('backend') }}/assets/libs/metismenu/metisMenu.min.js"></script>
    <script src="{{ asset('backend') }}/assets/libs/simplebar/simplebar.min.js"></script>
    <script src="{{ asset('backend') }}/assets/libs/node-waves/waves.min.js"></script>

    <!-- Required datatable js -->
    <script src="{{ asset('backend') }}/assets/libs/datatables.net/js/jquery.dataTables.min.js"></script>
    <script src="{{ asset('backend') }}/assets/libs/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>

    <!-- Buttons examples -->
    <script src="{{ asset('backend') }}/assets/libs/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
    <script src="{{ asset('backend') }}/assets/libs/datatables.net-buttons-bs4/js/buttons.bootstrap4.min.js"></script>

    <!-- apexcharts -->
    <script src="{{ asset('backend') }}/assets/libs/jszip/jszip.min.js"></script>
    <script src="{{ asset('backend') }}/assets/libs/pdfmake/build/pdfmake.min.js"></script>
    <script src="{{ asset('backend') }}/assets/libs/pdfmake/build/vfs_fonts.js"></script>
    <script src="{{ asset('backend') }}/assets/libs/datatables.net-buttons/js/buttons.html5.min.js"></script>
    <script src="{{ asset('backend') }}/assets/libs/datatables.net-buttons/js/buttons.print.min.js"></script>
    <script src="{{ asset('backend') }}/assets/libs/datatables.net-buttons/js/buttons.colVis.min.js"></script>
    <script src="{{ asset('backend') }}/assets/libs/datatables.net-keyTable/js/dataTables.keyTable.min.html"></script>
    <script src="{{ asset('backend') }}/assets/libs/datatables.net-select/js/dataTables.select.min.js"></script>

    <!-- Responsive examples -->
    <script src="{{ asset('backend') }}/assets/libs/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
    <script src="{{ asset('backend') }}/assets/libs/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js">
    </script>

    <!-- Datatable init js -->
    <script src="{{ asset('backend') }}/assets/js/pages/datatables.init.js"></script>

    <!-- dashboard init -->
    <script src="{{ asset('backend') }}/assets/js/pages/dashboard.init.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>


    <script src="{{ asset('backend') }}/assets/libs/select2/js/select2.min.js"></script>
    <script src="{{ asset('backend') }}/assets/libs/spectrum-colorpicker2/spectrum.min.js"></script>
    <script src="{{ asset('backend') }}/assets/libs/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js"></script>
    <!-- form advanced init -->
    <script src="{{ asset('backend') }}/assets/libs/flatpickr/flatpickr.min.js"></script>
    <script src="{{ asset('backend') }}/assets/libs/datepicker/jquery-datepicker.min.js"></script>
    <script src="{{ asset('backend') }}/assets/js/pages/form-advanced.init.js"></script>
    <!-- App js -->
    <script src="{{ asset('backend') }}/assets/js/app.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

    @include('sweetalert::alert')
    <script src="{{ asset('backend') }}/assets/js/tost.js"></script>
    <script src="{{ asset('js/alert_generator.js') }}"></script>

    <script>
        $(document).ready(function(){
            $('.datepicker').datepicker({
                {{--  dateFormat: "Y-m-d H:i:s",  --}}
                maxDate: '0'
            });
        });
    </script>
    @stack('script')
</body>

</html>
