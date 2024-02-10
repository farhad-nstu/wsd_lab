@extends('layouts.admin.app')
@section('title', 'Create User')
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
                                @can('user.show')
                                    <a href="{{ route('user.index') }}" class="btn btn-primary waves-effect waves-light">User
                                        List</a>
                                @endcan
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <form method="POST" action="{{ route('user.store') }}" enctype="multipart/form-data">
                        @csrf
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Name <span class="text-danger">*</span></label>
                                    <input type="text" name="name"
                                        class="form-control @error('name') is-invalid @enderror" id="name"
                                        placeholder="Enter name" value="{{ old('name') }}" required>
                                    {!! $errors->first('name', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">E-Mail Address<span
                                            class="text-danger">*</span></label>
                                    <input type="text" name="email"
                                        class="form-control @error('email') is-invalid @enderror" id="email"
                                        placeholder="Enter email address" value="{{ old('email') }}" required>
                                    {!! $errors->first('email', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password <span
                                            class="text-danger">*</span></label>
                                    <input type="password" name="password"
                                        class="form-control @error('password') is-invalid @enderror" id="password"
                                        placeholder="Enter password" required>
                                    {!! $errors->first('password', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                                <div class="mb-3">
                                    <label for="password_confirmation" class="form-label">Confirm Password <span
                                            class="text-danger">*</span></label>
                                    <input type="password" name="password_confirmation"
                                        class="form-control @error('password_confirmation') is-invalid @enderror"
                                        id="password_confirmation" placeholder="Enter confirm password" required>
                                    {!! $errors->first('password_confirmation', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                                <div class="mb-3">
                                    <label for="mobile" class="form-label">Mobile No.</label>
                                    <input type="text" name="mobile"
                                        class="form-control @error('mobile') is-invalid @enderror" id="mobile"
                                        placeholder="Enter mobile" value="{{ old('mobile') }}">
                                    {!! $errors->first('mobile', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="roles" class="form-label">Role<span
                                            class="text-danger">*</span></label>
                                    <select id="roles" name="roles[]" multiple
                                        class="form-control select2 @error('roles.*') is-invalid @enderror"
                                        style="width:100%" required>

                                        @php
                                            $roles = Spatie\Permission\Models\Role::where('id', '!=', 1)->get();
                                        @endphp
                                        @foreach ($roles as $role)
                                            <option value="{{ $role->id }}"
                                                {{ collect(old('roles'))->contains($role->id) ? 'selected' : '' }}>
                                                {{ $role->name }}</option>
                                        @endforeach

                                    </select>
                                    {!! $errors->first('roles.*', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                                <div class="mb-3">
                                    <label for="permissions" class="form-label">Assign Permission</label>
                                    <select id="permissions" name="permissions[]" multiple
                                        class="form-control select2 @error('permissions.*') is-invalid @enderror"
                                        style="width:100%" >

                                        @php
                                            $permissions = Spatie\Permission\Models\Permission::get();
                                        @endphp
                                        @foreach ($permissions as $permission)
                                            <option value="{{ $permission->id }}"
                                                {{ collect(old('permissions'))->contains($permission->id) ? 'selected' : '' }}>
                                                {{ $permission->name }}</option>
                                        @endforeach

                                    </select>
                                    {!! $errors->first('permissions.*', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                                <div class="mb-3">
                                    <label id="status1" class="form-label">Status</label>
                                    <select name="status" style="width:100%" id="status1"
                                        class="form-control select2 @error('status') is-invalid @enderror">
                                        <option value="1">Active</option>
                                        <option value="0">Inactive
                                        </option>
                                    </select>
                                    {!! $errors->first('status', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                                <div class="mb-0 mb-md-3">
                                    <label for="avatar" class="form-label">Photo</label>
                                    <input class="form-control form-control-lg @error('avatar') is-invalid @enderror"
                                        name="avatar" id="readUrl" type="file">
                                    {!! $errors->first('avatar', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                                <div class="mb-0 mb-md-3">
                                    <img id="uploadedImage" style="width: 20% !important" src="" alt="photo"
                                        class="img-thumbnail">
                                </div>
                            </div>
                        </div>
                        <div>
                            @can('user.create')
                                <button class="btn btn-primary" type="submit">Submit</button>
                            @endcan
                        </div>
                    </form>
                </div><!-- end card-body -->
            </div><!-- end card -->
        </div> <!-- end col -->
    </div>
@stop

@push('script')
    <script>
        const get_designation = (e) => {
            const office_id = e.target.value;
            $.ajax({
                url: "{{ url('get-designation') }}",
                type: 'get',
                data: {
                    'office_id': office_id
                },
                success: function(response) {
                    $('#designation_id').html('<option value="">Select Designation</option>');
                    $.each(response.designations, function(key, value) {
                        $("#designation_id").append('<option value="' + value
                            .id + '">' + value.name + '</option>');
                    });
                }
            });
        }
        const get_office = (e) => {
            const channel_id = e.target.value;
            $.ajax({
                url: "{{ url('get-office') }}",
                type: 'get',
                data: {
                    'channel_id': channel_id
                },
                success: function(response) {
                    $('#office_id').html('<option value="">Select Office</option>');
                    //$('#designation_id').html('<option value="">Select Designation</option>');
                    $.each(response.offices, function(key, value) {
                        $("#office_id").append('<option value="' + value
                            .id + '">' + value.name + '-' + value.office_code + '</option>');
                    });
                }
            });
        }
        document.getElementById('readUrl').addEventListener('change', function() {
            if (this.files[0]) {
                var picture = new FileReader();
                picture.readAsDataURL(this.files[0]);
                picture.addEventListener('load', function(event) {
                    document.getElementById('uploadedImage').setAttribute('src', event.target.result);
                    document.getElementById('uploadedImage').style.display = 'block';
                });
            }
        });
    </script>
    @if ($errors->any())
        <script>
            const status = "{{ old('status') }}";
            $("#status1").val(status);
        </script>
    @endif
@endpush
