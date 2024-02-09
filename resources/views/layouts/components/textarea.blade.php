<div class="{{ $wrap }}">
    <div class="mb-3">
        @if (isset($label))
            <label for="{{ $field }}" class="form-label">{{ $label }}@if(isset($required))<span class="text-danger"> *</span>@endif</label>
        @endif
        <textarea name="{{ $field }}" style="height: auto !important"
            class="form-control @error($field) is-invalid @enderror {{ isset($class_name) ? $class_name : '' }}"
            id="{{ isset($id) ? $id : '' }}" placeholder="{{ isset($placeholder) ? $placeholder : '' }}"
            rows="{{ isset($rows) ? $rows : 3 }}" {{ isset($event) ? $event . '=' : '' }}{{ isset($function) ? $function : '' }}
            {{ isset($event1) ? $event . '=' : '' }}{{ isset($function1) ? $function : '' }}
            {{ isset($event2) ? $event . '=' : '' }}{{ isset($function2) ? $function : '' }}>{{ old($field, isset($value) ? $value : '') }}</textarea>
        {!! $errors->first($field, '<span class="invalid-feedback">:message</span>') !!}
    </div>
</div>
