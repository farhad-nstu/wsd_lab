@extends('layouts.app')
@section('title', 'Dashboard')
@push('style')
    <style>
        .card {
            margin-bottom: 20px;
            box-shadow: 0 0 10px #e1e1e1;
            -webkit-box-shadow: 0 0 10px #e1e1e1;
            -moz-box-shadow: 0 0 10px #e1e1e1;
            -o-box-shadow: 0 0 10px #e1e1e1;
        }

        .card-body {
            -webkit-box-flex: 1;
            -ms-flex: 1 1 auto;
            flex: 1 1 auto;
            padding: 1.35rem 0.2rem !important;
        }
        #proposal_summary,
        #policy_summary{
            padding: 20px;
        }
        #proposal_summary:hover,
        #policy_summary:hover {
            cursor: pointer;
        }



        .shadow {
            box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
        }
        .border {
            border: 1px solid #dee2e6!important;
        }
        .bg-white {
            background-color: #fff!important;
        }
        .p-4 {
            padding: 1.5rem!important;
        }
        .media {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: start;
            align-items: flex-start;
        }

        .notify-icon {
            width: 46px;
            height: 46px;
            text-align: center;
            font-size: 20px;
        }

        .bg-theme {
            background: #0D47A1;
            color: #fff;
        }
        .mr-3, .mx-3 {
            margin-right: 1rem!important;
        }
        .align-self-center {
            -ms-flex-item-align: center!important;
            align-self: center!important;
        }
        .rounded-circle {
            border-radius: 50%!important;
        }


        .pl-2, .px-2 {
            padding-left: 0.5rem!important;
        }

        .fa {
            display: inline-block;
            margin: 25%;
            font-size: inherit;
            text-rendering: auto;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .media-body {
            -ms-flex: 1;
            flex: 1;
        }
        .button-container p, .bc-description {
            font-weight: 600;
            font-size: 14px;
            color: #5c5c5c;
            margin-top: 0;
            margin-bottom: 0;
        }
        .button-container p span {
            font-size: 10px;
        }

        .text-muted {
            color: #6c757d!important;
        }
        .shadow-box-in-d{
            height: 140px !important;
        }
    </style>
@endpush
@section('body')
    <div class="row">
        <div class="col-md-12">
            <div class="card text-center">
                <div class="card-body">
                    <div class="row">
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop
