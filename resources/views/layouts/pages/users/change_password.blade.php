@extends('layouts.app')
@section('title', 'Change Password')
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
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12 text-center">
                            @if (\Session::has('reset_password'))
                                <div class="alert alert-danger">
                                    <p>{!! \Session::get('reset_password') !!}</p>
                                </div>
                            @endif

                        </div>
                    </div>
                    <form method="POST" action="{{ route('user.update.password', $id) }}" enctype="multipart/form-data">
                        @csrf
                        @method('PATCH')
                        <div class="row">
                            <div class="col-md-7">
                                <div class="mb-3">
                                    <label for="current_password" class="form-label">Current Password <span
                                            class="text-danger">*</span></label>
                                    <input type="password" name="current_password"
                                        class="form-control @error('current_password') is-invalid @enderror"
                                        id="current_password" placeholder="Enter current password" required>
                                    {!! $errors->first('current_password', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                                <div class="mb-3">
                                    <label for="new_password" class="form-label">New Password <span
                                            class="text-danger">*</span></label>
                                    <input type="password" name="new_password"
                                        class="form-control @error('new_password') is-invalid @enderror" id="new_password"
                                        placeholder="Enter new password" required>
                                    {!! $errors->first('new_password', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                                <div class="mb-3">
                                    <label for="password_confirmation" class="form-label">Confirm Password <span
                                            class="text-danger">*</span></label>
                                    <input type="password" name="password_confirmation"
                                        class="form-control @error('password_confirmation') is-invalid @enderror"
                                        id="password_confirmation" placeholder="Enter confirm password" required>
                                    {!! $errors->first('password_confirmation', '<span class="invalid-feedback">:message</span>') !!}
                                </div>
                            </div>
                        </div>
                        <div>
                            <button class="btn btn-primary" type="submit">Submit Changes</button>
                        </div>
                    </form>
                </div> <!-- end card-body -->
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
    @if ($errors->any())
        <script>
            const status = "{{ old('status') }}";
            $("#status1").val(status);
        </script>
    @endif
@endpush
