@extends('layouts.admin.app')
@section('title', 'Edit User')
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
                    <form method="POST" action="{{ route('user.update', $user->id) }}" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Name <span class="text-danger">*</span></label>
                                    <input type="text" name="name"
                                        class="form-control @error('name') is-invalid @enderror" id="name"
                                        placeholder="Enter name" value="{{ old('name', $user->name) }}" required>
                                    {!! $errors->first('name', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">E-Mail Address<span
                                            class="text-danger">*</span></label>
                                    <input type="text" name="email"
                                        class="form-control @error('email') is-invalid @enderror" id="email"
                                        placeholder="Enter email address" value="{{ old('email', $user->email) }}" required>
                                    {!! $errors->first('email', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                                <div class="mb-3">
                                    <label for="mobile" class="form-label">Mobile No.</label>
                                    <input type="text" name="mobile"
                                        class="form-control @error('mobile') is-invalid @enderror" id="mobile"
                                        placeholder="Enter mobile" value="{{ old('mobile', $user->mobile) }}">
                                    {!! $errors->first('mobile', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                                <div class="mb-3">
                                    <label for="staff_id" class="form-label">Staff ID</label>
                                    <input type="text" name="staff_id"
                                        class="form-control @error('staff_id') is-invalid @enderror" id="staff_id"
                                        placeholder="Enter staff ID" value="{{ old('staff_id', $user->staff_id) }}">
                                    {!! $errors->first('staff_id', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                                <div class="mb-3">
                                    <label id="status1" class="form-label">Status</label>
                                    <select name="status" style="width:100%" id="status1"
                                        class="form-control select2 @error('status') is-invalid @enderror">
                                        <option value="1" {{ old('status', $user->status) == 1 ? 'selected' : '' }}>
                                            Active
                                        </option>
                                        <option value="0" {{ old('status', $user->status) == 0 ? 'selected' : '' }}>
                                            Inactive
                                        </option>
                                        </option>
                                    </select>
                                    {!! $errors->first('status', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Business Channel <span
                                            class="text-danger">*</span></label>
                                    <select name="channel_id" id="channel_id" onchange=""
                                        class="form-control select2 @error('channel_id') is-invalid @enderror"
                                        style="width:100%" required>
                                        <option value="">Select Business Channel</option>
                                        @foreach ($channels as $channel)
                                            <option value="{{ $channel->id }}"
                                                {{ $user->channel_id == $channel->id ? 'selected' : '' }}>
                                                {{ $channel->name }}
                                            </option>
                                        @endforeach
                                    </select>
                                    {!! $errors->first('channel_id', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                                <div class="mb-3">
                                    <label for="name" class="form-label">Office <span
                                            class="text-danger">*</span></label>
                                    <select name="office_id" id="office_id" onchange=""
                                        class="form-control select2 @error('office_id') is-invalid @enderror"
                                        style="width:100%" required>
                                        <option value="">Select Office</option>
                                        @foreach ($offices as $office)
                                            <option value="{{ $office->id }}"
                                                {{ $user->office_id == $office->id ? 'selected' : '' }}>
                                                {{ $office->name }}-{{ $office->office_code }}</option>
                                        @endforeach


                                    </select>
                                    {!! $errors->first('office_id', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                                <div class="mb-3">
                                    <label for="designation_id" class="form-label">Designation<span
                                            class="text-danger">*</span></label>
                                    <select id="designation_id" name="designation_id"
                                        class="form-control select2 @error('designation_id') is-invalid @enderror"
                                        style="width:100%" required>
                                        <option value="">Select Designation</option>
                                        @foreach($designations as $designation)
                                        <option value="{{$designation->id}}"
                                        {{ $user->designation_id == $designation->id ? 'selected' : '' }}>{{$designation->name}}</option>
                                        @endforeach

                                    </select>
                                    {!! $errors->first('designation_id', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
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
                                                {{ collect($user->roles->pluck('id'))->contains($role->id) ? 'selected' : '' }}>
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
                                                {{ collect($user->permissions->pluck('id'))->contains($permission->id) ? 'selected' : '' }}>
                                                {{ $permission->name }}</option>
                                        @endforeach

                                    </select>
                                    {!! $errors->first('permissions.*', '<span class="invalid-feedback">:message</span>') !!}
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
                            @can('user.edit')
                                <button class="btn btn-primary" type="submit">Submit Changes</button>
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
                    $('#designation_id').html('<option value="">Select Designation</option>');
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
@endpush
