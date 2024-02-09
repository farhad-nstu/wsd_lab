@extends('layouts.admin.app')
@section('title', 'Edit Permissions')
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
                                    <a href="{{ route('user.index') }}" class="btn btn-primary waves-effect waves-light">Role
                                        List</a>
                                @endcan
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <form method="POST" action="{{ route('user.permissions-update', $user->id) }}">
                        @csrf
                        @method('PUT')
                        <div class="row">
                            <div class="col-md-6">
                                User : {{ $user->name }}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <hr>
                                <div class="form-group edit_all">
                                    <label for="name">Permisions</label>
                                    <div class="form-check">
                                        <input readonly type="checkbox" readonly class="form-check-input"
                                            id="edit_checkPermissionAll" value="1"
                                            {{ HasPermissions($user, $all_permissions) ? 'checked' : '' }}>
                                        <label class="form-check-label" for="edit_checkPermissionAll">All</label>
                                    </div>
                                    <hr>
                                    @php $i=1; @endphp
                                    @foreach ($group_permissions as $key => $group_permission)
                                        <div class="row">
                                            <div class="col-3">
                                                <div class="form-check">
                                                    <input readonly type="checkbox" class="form-check-input"
                                                        id="edit_{{ $i }}management" value="{{ $key }}"
                                                        onclick="edit_checkPermissionByGroup('edit_role-{{ $i }}-management-checkbox', this)"
                                                        {{ HasPermissions($user, $group_permission) ? 'checked' : '' }}>
                                                    <label class="form-check-label"
                                                        for="edit_checkPermission">{{ ucwords($key) }}</label>
                                                </div>
                                            </div>

                                            <div class="col-9 edit_role-{{ $i }}-management-checkbox">
                                                <div class="row">
                                                    @foreach ($group_permission as $permission)
                                                        <div class="col-md-3">
                                                            <div class="form-check">
                                                                <input readonly type="checkbox" class="form-check-input"
                                                                    name="permissions[]"
                                                                    id="edit_checkPermission{{ $permission->id }}"
                                                                    value="{{ $permission->name }}"
                                                                    onclick="edit_checkSinglePermission('edit_role-{{ $i }}-management-checkbox','edit_{{ $i }}management','{{ count($group_permission) }}')"
                                                                    {{ $user->hasPermissionTo($permission->name) ? 'checked' : '' }}>
                                                                <label class="form-check-label"
                                                                    for="edit_checkPermission{{ $permission->id }}">
                                                                    @php
                                                                        $permision_name = isset(explode('.', $permission->name)[1]) ? explode('.', $permission->name)[1] : '';
                                                                    @endphp
                                                                    {{ ucwords($permision_name) }}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    @endforeach
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <hr>
                                            </div>
                                        </div>
                                        @php  $i++; @endphp
                                    @endforeach

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
        /**
         * Check all the permissions
         */
        $("#edit_checkPermissionAll").click(function() {
            if ($(this).is(':checked')) {
                // check all the checkbox
                $('input[type=checkbox]').prop('checked', true);
            } else {
                // un check all the checkbox
                $('input[type=checkbox]').prop('checked', false);
            }
        });

        function edit_checkPermissionByGroup(className, checkThis) {
            const groupIdName = $("#" + checkThis.id);
            const classCheckBox = $('.' + className + ' input');
            if (groupIdName.is(':checked')) {
                classCheckBox.prop('checked', true);
            } else {
                classCheckBox.prop('checked', false);
            }
            edit_implementAllChecked();
        }

        function edit_checkSinglePermission(groupClassName, groupID, countTotalPermission) {
            const classCheckbox = $('.' + groupClassName + ' input');
            const groupIDCheckBox = $("#" + groupID);
            // if there is any occurance where something is not selected then make selected = false
            if ($('.' + groupClassName + ' input:checked').length == countTotalPermission) {
                groupIDCheckBox.prop('checked', true);
            } else {
                groupIDCheckBox.prop('checked', false);
            }
            edit_implementAllChecked();
        }

        function edit_implementAllChecked() {
            const countPermissions = {{ count($all_permissions) }};
            const countPermissionGroups = {{ count($group_permissions) }};
            if ($('.edit_all input:checked').length >= (countPermissions + countPermissionGroups)) {
                $("#edit_checkPermissionAll").prop('checked', true);
            } else {
                $("#edit_checkPermissionAll").prop('checked', false);
            }
        }
    </script>
@endpush
