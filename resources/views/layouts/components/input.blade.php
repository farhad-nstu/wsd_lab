<div class="{{ $wrap }}">
    <div class="mb-3">
        @if (isset($label))
            <label for="{{ $id }}" class="form-label col-md-12">{{ $label }}@if(isset($required))<span class="text-danger"> *</span>@endif</label>
        @endif
        <input type="{{ $type }}" name="{{ $field }}"
            class="form-control @error($field) is-invalid @enderror {{ isset($class_name) ? $class_name : '' }}"
            id="{{ isset($id) ? $id : '' }}" placeholder="{{ isset($placeholder) ? $placeholder : '' }}"
            value="{{ old($field, isset($value) ? $value : '') }}"
            {{ isset($event) ? $event . '=' : '' }}{{ isset($function) ? $function : '' }}
            {{ isset($event1) ? $event . '=' : '' }}{{ isset($function1) ? $function : '' }}
            {{ isset($event2) ? $event . '=' : '' }}{{ isset($function2) ? $function : '' }} @if(isset($disabled) && $disabled) disabled @endif @if(isset($readOnly) && $readOnly) readonly @endif @if(isset($required) && $required) required @endif>
        {!! $errors->first($field, '<span class="invalid-feedback">:message</span>') !!}

        {{--  this is needed for backend error caught while jaquery form submission  --}}
        <small id="{{ isset($id) ? $id : '' }}_text" style="color: red"></small>
    </div>
</div>
