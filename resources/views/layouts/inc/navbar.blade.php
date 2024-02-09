<div class="vertical-menu">
    <div data-simplebar class="h-100">
        <div id="sidebar-menu">
            <ul class="metismenu list-unstyled" id="side-menu">
                <li class="menu-title" key="t-menu">Menu</li>
                <li>
                    <a href="{{ url('home') }}" class="waves-effect">
                        <i class='bx bxs-dashboard'></i>
                        <span key="t-dashboard">Dashboard</span>
                    </a>
                </li>
                @canany(card_permissions())
                    <li>
                        <a href="javascript: void(0);" class="has-arrow waves-effect">
                            <i class='bx bx-share-alt'></i>
                            <span key="t-multi-level">Card Management</span>
                        </a>
                        <ul class="sub-menu" aria-expanded="true">
                            @can('cards.index')
                                <li><a href="{{ route('cards.index') }}">{{ __('Card List') }}</a>
                                </li>
                            @endcan
                        </ul>
                    </li>
                @endcanany
            </ul>
        </div>
    </div>
</div>
