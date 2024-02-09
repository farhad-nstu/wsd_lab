@extends('layouts.admin.app')
@section('title', 'User List')
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
                                @can('user.create')
                                    <a href="{{ route('user.create') }}" class="btn btn-primary waves-effect waves-light">Add
                                        New</a>
                                @endcan
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-12">
                    <div class="card">
                        <div class="card-body">
                            <form action="{{ route(\Request::route()->getName()) }}" method="get">
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="mb-3">
                                            <label for="email">Email</label>
                                            <input type="text" class="form-control" id="email"
                                                name="email" placeholder="Email"
                                                value="{{ $requests['email'] ?? '' }}">
                                            <p class="text-danger" id="email_err"></p>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="row">
                                    <div class="col-lg-12 text-center">
                                        <div class="mb-0 mb-md-3">
                                            <button type="submit" class="btn btn-success">Search</button>

                                            <a href="{{ route(\Request::route()->getName()) }}" class="btn btn-info">Remove
                                                Filters</a>
                                        </div>
                                    </div>
                                </div>

                        </div>
                    </div>
                </div>
                <div class="card-body table-responsive ">
                    <table class="table table-bordered table-striped nowrap w-100">
                        <thead>
                            <tr class="text-center">
                                <th>ID</th>
                                <th>Business Channel</th>
                                <th>Office</th>
                                <th>User</th>
                                <th>E-Mail</th>
                                <th>Mobile</th>
                                <th>Status</th>
                                <!-- <th>Role</th> -->
                                <!-- <th>Permissions</th> -->
                                <th>action</th>
                            </tr>
                        </thead>


                        <tbody>
                            @foreach ($users as $user)
                                <tr class="text-center">
                                    <td>{{ __('#' . $user->staff_id) }}</td>
                                    <td>{{ $user->Channel->name??'' }}</td>
                                    <td>{{ $user->Office->name??'' }}</td>
                                    <td>
                                        <div class="text-center">
                                            <img src="{{ parse_url($user->avatar, PHP_URL_SCHEME) == 'https' || parse_url($user->avatar, PHP_URL_SCHEME) == 'http'
                                                ? $user->avatar
                                                : Storage::url($user->avatar) }}"
                                                alt="avatar-4" class="avatar-xl img-thumbnail rounded-circle">
                                            <h4 class="text-primary" style="font-size: 16px !important;">
                                                {{ $user->name }}</h4>
                                            <h5 class="text-muted font-size-13">
                                                {{ $user->designation_id ? $user->designation->name : 'Producer' }}</h5>
                                        </div>
                                    </td>
                                    <td>{{ $user->email }}</td>
                                    <td>{{ $user->mobile }}</td>
                                    <td>
                                        @if ($user->status)
                                            <a class="btn btn-danger" onclick="return confirm('Are you sure desable this?')"
                                                href="{{ route('user.status', $user->id) }}"
                                                class="btn btn-info">Disable</a>
                                        @else
                                            <a class="btn btn-success" onclick="return confirm('Are you sure enable this?')"
                                                href="{{ route('user.status', $user->id) }}"
                                                class="btn btn-info">Enable</a>
                                        @endif
                                    </td>
                                    <td>{{ $user->roles->first()?$user->roles->first()->name:'' }}</td>
                                    <!-- <td>
                                            @can('user.edit')
        <a href="{{ route('user.permissions', $user->id) }}" class="btn btn-warning"><i
                                                            class="fas fa-edit"></i></a>
    @endcan
                                        </td> -->
                                    <td>
                                        @can('user.edit')
                                            <a href="{{ route('user.edit', $user->id) }}" class="btn btn-warning"><i
                                                    class="fas fa-edit"></i></a>
                                        @endcan
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                    <div class="row">
                        <div class="col-md-12 text-center">
                            {{ $users->links() }}
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
