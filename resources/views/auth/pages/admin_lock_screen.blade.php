@extends('auth.app')
@section('title', 'Screen Lock')


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
    <form method="POST" action="{{ route('admin.login') }}">
        @csrf
        <div class="mt-4">
            <div class="user-thumb text-center">
                <img src="{{ parse_url($admin->avatar, PHP_URL_SCHEME) == 'https' || parse_url($admin->avatar, PHP_URL_SCHEME) == 'http'
                    ? $admin->avatar
                    : Storage::url(admin()->avatar) }}"
                    class="rounded-circle img-thumbnail avatar-md" alt="thumbnail">
                <h5 class="font-size-15 mt-3">{{ $admin->name }}</h5>
            </div>
        </div>
        <div class="mb-3">
            <input type="hidden" name="email" value="{{ $admin->email }}">
        </div>

        <div class="mb-3 mb-4">
            <label for="password" class="fw-semibold">Password</label>
            <input type="password" name="password" class="form-control @error('email') is-invalid @enderror" id="password"
                placeholder="Enter password" required autocomplete="current-password">
            @error('email')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="row align-items-center">
            <div class="col-7">
                @if (Route::has('password.request'))
                    <a href="{{ route('password.request') }}" class="text-muted"><i class="mdi mdi-lock me-1"></i>
                        {{ __('Forgot your password?') }}</a>
                @endif
            </div>
            <div class="col-5">
                <div class="text-end">
                    <button class="btn btn-primary w-md waves-effect waves-light" type="submit">Unlock</button>
                </div>
            </div>
        </div>
    </form>
@stop
