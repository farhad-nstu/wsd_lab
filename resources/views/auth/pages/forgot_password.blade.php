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
    <form method="POST" action="{{ route('password.email') }}">
        @csrf
        @if (session('status'))
            <div class="mb-3 mb-4 font-medium text-sm text-success">
                {{ session('status') }}
            </div>
        @endif
        <div class="mb-3 mb-4">
            <label for="email" class="fw-semibold">E-Mail Address</label>
            <input type="email" name="email" class="form-control @error('email') is-invalid @enderror" id="email"
                placeholder="Enter email" required autocomplete="email">
            @error('email')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
            @enderror
        </div>

        <div class="row align-items-center">
            <div class="col-5">
                <a href="{{ route('login') }}" class="text-muted"><i class="fas fa-user"></i>
                    {{ __('Back to Login') }}</a>
            </div>
            <div class="col-7">
                <div class="text-end">
                    <button class="btn btn-primary w-md waves-effect waves-light" type="submit">Send Reset Link</button>
                </div>
            </div>
        </div>
        <div style="height: 100px"></div>
    </form>
@stop
