@extends('layouts.admin.app')
@section('title', 'Permission List')
@push('style')
    <style>
        .avatar-xl {
            height: 2.5rem;
            width: 2.5rem;
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
                                <a href="{{ route('permission.create') }}"
                                    class="btn btn-primary waves-effect waves-light">Create
                                    New</a>
                            </div>
                        </div>
                    </div>
                </div>
             
                <div class="card-body table-responsive ">
                    <table class="table table-bordered table-striped  w-100">
                        <thead>
                            <tr class="text-center table-hd-bg">
                                <th>#</th>
                                <th>Permission Name</th>
                                <th>Group Name</th>
                                <th>Guard Name</th>
                            </tr>
                        </thead>
                        @foreach ($permissions as $permission)
                            <tr class="text-center">
                                <td>{{ $loop->index + 1 }}</td>
                                <td>{{ $permission->name }}</td>
                                <td>{{ $permission->group_name }}</td>
                                <td>{{ $permission->guard_name }}</td>
                                <td> 
                                    <a href="{{ route('permission.edit', $permission->id) }}" class="btn btn-warning"><i
                                            class="fas fa-edit"></i></a>
                                       
                                </td>
                            </tr>
                        @endforeach
                        <tbody>
                            
                        </tbody>
                    </table>
                    <div class="row">
                        <div class="col-md-12 text-center">
                        {{ $permissions->links() }}
                        </div>
                    </div>
                </div>
                <!-- end card-body -->
            </div>
            <!-- end card -->
        </div> <!-- end col -->
    </div> <!-- end row -->
@stop

@push('script')
@endpush
