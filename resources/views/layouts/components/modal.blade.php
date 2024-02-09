<!--  Large modal example -->
<div class="modal fade bs-example-modal-xl" role="dialog" id="{{ $modal_id }}" aria-labelledby="myLargeModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="myLargeModalLabel">{{ $title }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                @include($form_path, ['form_id' => $form_id])
            </div>
            <div class="modal-footer">
                <a href="{{ url()->current() }}" class="btn btn-secondary waves-effect">Close</a>
                <button type="button"
                    onclick="
                event.preventDefault();
                document.getElementById('{{ $form_id }}').submit()
                "
                    class="btn btn-primary waves-effect waves-light">
                    {{ $submit }}
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
