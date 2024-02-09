@extends('layouts.admin.app')
@section('title', 'Create Role')
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
                                @can('role.show')
                                    <a href="{{ route('role.index') }}" class="btn btn-primary waves-effect waves-light">Role
                                        List</a>
                                @endcan
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <form method="POST" action="{{ route('role.store') }}">
                        @csrf
                        <div class="row">

                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Role name <span
                                            class="text-danger">*</span></label>
                                    <input type="text" name="name"
                                        class="form-control @error('name') is-invalid @enderror" id="name"
                                        placeholder="Role name" value="{{ old('name', request()->name) }}" required>
                                    {!! $errors->first('name', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                            </div>
                            @include('layouts.components.select', [
                                'wrap' => 'col-md-6',
                                'label' => 'Guard Name',
                                'field' => 'guard_name',
                                'id' => 'guard',
                                'placeholder' => 'Select Guard',
                                'values' => $guards,
                                'current_value' => request()->guard,
                                'value_type' => 'indexed',
                                'event' => 'onchange',
                                'function' => 'selectPermissions(event)',
                            ])

                        </div>
                        @if (count($group_permissions) > 0)
                            <div class="row">
                                <div class="col-md-12">
                                    <hr>
                                    <div class="form-group all">
                                        <label for="name">Permisions</label>
                                        <div class="form-check">
                                            <input readonly type="checkbox" readonly class="form-check-input"
                                                id="checkPermissionAll" value="1">
                                            <label class="form-check-label" for="checkPermissionAll">All</label>
                                        </div>
                                        <hr>
                                        @php $i=1; @endphp
                                        @foreach ($group_permissions as $key => $group_permission)
                                            <div class="row">
                                                <div class="col-3">
                                                    <div class="form-check">
                                                        <input readonly type="checkbox" class="form-check-input"
                                                            id="{{ $i }}management" value="{{ $key }}"
                                                            onclick="checkPermissionByGroup('role-{{ $i }}-management-checkbox', this)">
                                                        <label class="form-check-label"
                                                            for="checkPermission">{{ ucwords($key) }}</label>
                                                    </div>
                                                </div>

                                                <div class="col-9 role-{{ $i }}-management-checkbox">
                                                    <div class="row">
                                                        @foreach ($group_permission as $permission)
                                                            <div class="col-md-3">
                                                                <div class="form-check">
                                                                    <input readonly type="checkbox" class="form-check-input"
                                                                        name="permissions[]"
                                                                        id="checkPermission{{ $permission->id }}"
                                                                        value="{{ $permission->name }}"
                                                                        onclick="checkSinglePermission('role-{{ $i }}-management-checkbox','{{ $i }}management','{{ count($group_permission) }}')">
                                                                    <label class="form-check-label badge badge-lg bg-info"
                                                                        for="checkPermission{{ $permission->id }}">
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
                        @endif
                        <div>
                            @can('role.create')
                                <button class="btn btn-primary" type="submit">Submit Role</button>
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
        function selectPermissions(event) {
            var targetUrl = "{{ route('role.create') }}";
            const guard = event.target.value;
            const name = document.getElementById('name').value;
            const url = targetUrl + '?guard=' + guard + '&name=' + name;
            window.location.href = url;
        }
        /**
         * Check all the permissions
         */
        $("#checkPermissionAll").click(function() {
            if ($(this).is(':checked')) {
                // check all the checkbox
                $('input[type=checkbox]').prop('checked', true);
            } else {
                // un check all the checkbox
                $('input[type=checkbox]').prop('checked', false);
            }
        });

        function checkPermissionByGroup(className, checkThis) {
            const groupIdName = $("#" + checkThis.id);
            const classCheckBox = $('.' + className + ' input');
            if (groupIdName.is(':checked')) {
                classCheckBox.prop('checked', true);
            } else {
                classCheckBox.prop('checked', false);
            }
            implementAllChecked();
        }

        function checkSinglePermission(groupClassName, groupID, countTotalPermission) {
            const classCheckbox = $('.' + groupClassName + ' input');
            const groupIDCheckBox = $("#" + groupID);
            // if there is any occurance where something is not selected then make selected = false
            if ($('.' + groupClassName + ' input:checked').length == countTotalPermission) {
                groupIDCheckBox.prop('checked', true);
            } else {
                groupIDCheckBox.prop('checked', false);
            }
            implementAllChecked()
        }

        function implementAllChecked() {
            const countPermissions = {{ count($all_permissions) }};
            const countPermissionGroups = {{ count($group_permissions) }};
            if ($('.all input:checked').length >= (countPermissions + countPermissionGroups)) {
                $("#checkPermissionAll").prop('checked', true);
            } else {
                $("#checkPermissionAll").prop('checked', false);
            }
        }
    </script>
@endpush
