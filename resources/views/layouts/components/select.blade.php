<div class="{{ $wrap }}">
    <div class="mb-3">
        @if (isset($label))
            <label for="{{ $id }}" class="form-label col-md-12">{{ $label }}@if(isset($required))<span class="text-danger"> *</span>@endif</label>
        @endif

        <select name="{{ $field }}"
            class="form-control form-select select2  @error($field) is-invalid @enderror {{ isset($class_name) ? $class_name : '' }}"
            id="{{ isset($id) ? $id : '' }}" placeholder="{{ isset($placeholder) ? $placeholder : '' }}" {{ isset($multiple) ? $multiple : '' }}
            style="width:100%!important" {{ isset($event) ? $event . '=' : '' }}{{ isset($function) ? $function : '' }}
            {{ isset($event1) ? $event . '=' : '' }}{{ isset($function1) ? $function : '' }}
            {{ isset($event2) ? $event . '=' : '' }}{{ isset($function2) ? $function : '' }} @if(isset($disabled) && $disabled) disabled @endif>
            <option value="">{{ $placeholder }}</option>
            @foreach ($values as $key => $value)
                @if ($value_type == 'indexed')
                    <option value="{{ isset($index) ? $key : $value }}"
                        {{ old($field, isset($current_value) ? $current_value : '') == (isset($index) ? $key : $value) ? 'selected' : '' }}>
                        {{ ucwords($value) }}
                    </option>
                @endif
                @if ($value_type == 'associative')
                    <option value="{{ $value[isset($index) ? $index : $key] }}"
                        {{ old($field, isset($current_value) ? $current_value : '') == $value[isset($index) ? $index : $key] && !is_null($value[isset($index) ? $index : $key]) ? 'selected' : '' }}>
                        {{ ucwords($value[$value_key]) }}  {{isset($second_value_key) ? '-'. ucwords($value[$second_value_key]):''}}
                    </option>
                @endif
            @endforeach
        </select>
        {!! $errors->first($field, '<span class="invalid-feedback">:message</span>') !!}

        {{--  this is needed for backend error caught while jaquery form submission  --}}
        <small id="{{ isset($id) ? $id : '' }}_id_text" style="color: red"></small>
    </div>
</div>
