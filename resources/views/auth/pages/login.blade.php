@extends('auth.app')
@section('title', 'Login')


@push('style')
    <style>
        .img-fluid {
            margin-top: 34%;
            max-width: 100%;
            height: auto;
        }
    </style>
@endpush
@section('body')
    <h3>{{ $login_title }}</h3>
    <form method="POST" action="{{ route($login_title == 'Admin Login' ? 'admin.login' : 'login') }}">
        @csrf
        <div class="mb-3">
            <label for="email" class="fw-semibold">E-Mail Address</label>
            <input type="text" class="form-control @error('email') is-invalid @enderror" value="{{ old('email') }}"
                id="email" name="email" placeholder="Enter email address">
            @error('email')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="mb-3 mb-4">
            <label for="password" class="fw-semibold">Password</label>
            <input type="password" name="password" class="form-control @error('password') is-invalid @enderror"
                id="password" placeholder="Enter password" required autocomplete="current-password">
            @error('password')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="row align-items-center">
            <div class="col-6">
                <div class="form-check">
                    <input type="checkbox" class="form-check-input font-size-16" name="remember" id="remember"
                        {{ old('remember') ? 'checked' : '' }}>
                    <label class="form-check-label" for="remember">Remember
                        me</label>
                </div>
            </div>
            <div class="col-6">
                <div class="text-end">
                    <button class="btn btn-primary w-md waves-effect waves-light" type="submit">Log In</button>
                </div>
            </div>
            @if (Route::has('password.request'))
                <div class="mt-4">
                    <a href="{{ route('password.request') }}" class="text-muted"><i class="mdi mdi-lock me-1"></i>
                        {{ __('Forgot your password?') }}</a>
                </div>
            @endif
        </div>
    </form>
@stop
