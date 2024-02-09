@extends('layouts.admin.app')
@section('title', 'Permission Create')
@push('style')
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/fileinput.min.css') }}" rel="stylesheet">
    <style>
        .info {
            background-color: aqua;
        }
    </style>
@endpush
@section('body')
    <div class="row">
        <div class="col-xl-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <h4 class="card-title">@yield('title')</h4>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex flex-wrap gap-2 float-end">
                                
                            </div>
                        </div>

                       
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">


        @if ($errors->any() && !old('_method'))
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <form method="POST" action="{{route('permission.store')}}" enctype="multipart/form-data">
            @csrf
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label for="name" class="form-label col-md-12">Permission Name</label>
                                            <input required type="text" name="name"class="form-control @error('name') is-invalid @enderror" id="name" placeholder="Enter Permission Name" >
                                                
                                            {!! $errors->first('name', '<span class="invalid-feedback">:message</span>') !!}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label for="group_name" class="form-label col-md-12">Group Name</label>
                                            <input required type="text" name="group_name"class="form-control @error('group_name') is-invalid @enderror" id="group_name" placeholder="Enter Group Name" >
                                                
                                            {!! $errors->first('group_name', '<span class="invalid-feedback">:message</span>') !!}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label for="guard_name" class="form-label col-md-12">Guard Name</label>
                                            <select required name="guard_name" id="guard_name" 
                                                class="form-control select2 @error('guard_name') is-invalid @enderror"
                                                style="width:100%" >
                                                <option value="">Select </option>
                                                <option value="admin">Admin </option>
                                                <option value="web">Web </option>
                                                            
                                            </select>
                                            {!! $errors->first('guard_name', '<span class="invalid-feedback">:message</span>') !!}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-12">
                                <hr>
                                <div class="mb-0 mb-md-3">
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </form>
    </div>

@stop


@push('script')

@endpush
