@extends('layouts.admin.app')
@section('title', 'Role List')
@push('style')
    <style>
        .table-hd-bg {
            background: #0576b9;
            color: #fff;
        }
    </style>
@endpush
@section('body')
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <h4 class="card-title">@yield('title')</h4>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex flex-wrap gap-2 float-end">
                                <a href="{{ url()->previous() }}" class="btn btn-light waves-effect"><i
                                        class="fas-light fas fa-angle-double-left"></i> Back</a>
                                @can('role.create')
                                    <a href="{{ route('role.create') }}" class="btn btn-primary waves-effect waves-light">Add
                                        New</a>
                                @endcan
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <form method="GET" action="{{ url()->current() }}" enctype="multipart/form-data">
                        @csrf
                        <div class="row">
                            <div class="col-lg-12">
                                <hr>
                            </div>
                            @include('layouts.components.select', [
                                'wrap' => 'col-md-6',
                                'field' => 'guard',
                                'id' => 'guard',
                                'placeholder' => 'Select Guard',
                                'values' => $guards,
                                'current_value' => request()->guard,
                                'value_type' => 'indexed',
                            ])
                            <div class="col-md-2">
                                <div class="mb-3">
                                    <button type="submit" class="btn btn-primary">Search</button>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <hr>
                            </div>
                        </div>
                    </form>
                    <table class="table table-bordered table-striped dt-responsive nowrap w-100">
                        <thead>
                            <tr class="table-hd-bg">
                                <th>#</th>
                                <th>Name</th>
                                <th>action</th>
                            </tr>
                        </thead>


                        <tbody>
                            @foreach ($roles as $role)
                                <tr>
                                    <td>{{ $loop->index + 1 }}</td>
                                    <td>{{ $role->name }}</td>
                                    <td>
                                        @can('role.edit')
                                            <a href="{{ route('role.edit', $role->id) }}" class="btn btn-info"><i
                                                    class="fas fa-edit"></i></a>
                                        @endcan
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>

                </div>
                <!-- end card-body -->
            </div>
            <!-- end card -->
        </div> <!-- end col -->
    </div> <!-- end row -->
@stop

@push('script')
@endpush
