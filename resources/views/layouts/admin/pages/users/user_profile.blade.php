@extends('layouts.admin.app')
@section('title', 'Edit Admin')
@push('style')
@endpush
@section('body')
    <div class="row">
        <div class="col-md-12">
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
                                @can('user.show')
                                    <a href="{{ route('user.index') }}" class="btn btn-primary waves-effect waves-light">User
                                        List</a>
                                @endcan
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <form method="POST" action="{{ route('admin.update.profile') }}" enctype="multipart/form-data">
                        @csrf
                        <div class="row">
                            <div class="col-md-6">
                                <input type="hidden" name="admin_id" value="{{ $admin->id }}">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Name <span class="text-danger">*</span></label>
                                    <input type="text" name="name"
                                        class="form-control @error('name') is-invalid @enderror" id="name"
                                        placeholder="Enter name" value="{{ old('name', $admin->name) }}" required>
                                    {!! $errors->first('name', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">E-Mail Address<span
                                            class="text-danger">*</span></label>
                                    <input type="text" name="email"
                                        class="form-control @error('email') is-invalid @enderror" id="email"
                                        placeholder="Enter email address" value="{{ old('email', $admin->email) }}"
                                        required>
                                    {!! $errors->first('email', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-3">
                                    <label for="mobile" class="form-label">Mobile No.</label>
                                    <input type="text" name="mobile"
                                        class="form-control @error('mobile') is-invalid @enderror" id="mobile"
                                        placeholder="Enter mobile" value="{{ old('mobile', $admin->mobile) }}">
                                    {!! $errors->first('mobile', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                                <div class="mb-0 mb-md-3">
                                    <label for="avatar" class="form-label">Photo</label>
                                    <input class="form-control form-control-lg @error('avatar') is-invalid @enderror"
                                        name="avatar" onchange="get_photo(event)" id="avatar" type="file">
                                    {!! $errors->first('avatar', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                                <div class="mb-0 mb-md-3">
                                    <img id="avatar_output" style="width: 40% !important"
                                        src="{{ Storage::url($admin->avatar) }}" alt="photo" class="img-thumbnail">
                                </div>
                            </div>
                            <div>
                                {{-- @can('user.edit') --}}
                                <button class="btn btn-primary" type="submit">Submit Changes</button>
                                {{-- @endcan --}}
                            </div>
                        </div>
                    </form>
                </div><!-- end card-body -->
            </div><!-- end card -->
        </div> <!-- end col -->
    </div>
@stop

@push('script')
    <script>
        const get_photo = (e) => {
            const avatar = URL.createObjectURL(e.target.files[0]);
            $("#" + e.target.id + "_output").attr("src", avatar);
        }
    </script>
@endpush
