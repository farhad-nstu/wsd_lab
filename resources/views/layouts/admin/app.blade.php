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
    <style>
        .text {
            text-transform: uppercase;
            margin: 0 auto;
            background-image: linear-gradient(90deg, #db6f6f, #d68ee7);
            background-clip: text;
            -moz-background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            font-size: 25px;
        }
    </style>
    @stack('style')

</head>

<body data-sidebar="dark">

    <!-- <body data-layout="horizontal" data-topbar="dark"> -->

    <!-- Begin page -->
    <div id="layout-wrapper">
        @include('layouts.admin.inc.header')
        @include('layouts.admin.inc.navbar')

        <!-- ============================================================== -->
        <!-- Start right Content here -->
        <!-- ============================================================== -->
        <div class="main-content">

            <div class="page-content">
                <div class="container-fluid">
                    <!-- start page title -->
                    @include('layouts.admin.inc.start_page_title')
                    <!-- end page title -->
                    @yield('body')
                </div>
                <!-- container-fluid -->
            </div>
            <!-- End Page-content -->

            @include('layouts.admin.inc.footer')

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


    <script src="{{ asset('backend') }}/assets/libs/select2/js/select2.min.js"></script>
    <script src="{{ asset('backend') }}/assets/libs/spectrum-colorpicker2/spectrum.min.js"></script>
    <script src="{{ asset('backend') }}/assets/libs/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js"></script>
    <!-- form advanced init -->
    <script src="{{ asset('backend') }}/assets/libs/flatpickr/flatpickr.min.js"></script>
    <script src="{{ asset('backend') }}/assets/js/pages/form-advanced.init.js"></script>
    <!-- App js -->
    <script src="{{ asset('backend') }}/assets/js/app.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    @if (0 == 1)
        <script>
            $("#triger_switch_select_modal").click();
            $(document).ready(function() {
                $("#select3").select2({
                    dropdownParent: $("#switch_modal")
                });
            });
        </script>
    @else
        <script>
            $(document).ready(function() {
                $("#select3").select2({
                    dropdownParent: $("#switch_modal")
                });
            });
        </script>
    @endif

    @include('sweetalert::alert')
    @stack('script')
</body>

</html>
