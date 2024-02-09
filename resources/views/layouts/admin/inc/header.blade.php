<header id="page-topbar">
    <div class="navbar-header">
        <div class="d-flex">
            <!-- LOGO -->
            <div class="navbar-brand-box">
                <a href="{{ url('home') }}" class="logo logo-dark">
                    <span class="logo-sm">
                        <img src="{{ asset('img/logo.jpg') }}" alt="logo-sm"
                            width="100%">
                    </span>
                    <span class="logo-lg">
                        <img src="{{ asset('img/logo.jpg') }}" alt="logo-dark"
                            width="100%">
                    </span>
                </a>

                <a href="{{ url('home') }}" class="logo logo-light">
                    <span class="logo-sm">
                        <img src="{{ asset('img/logo.jpg') }}" alt="logo-sm-light"
                            width="100%">
                    </span>
                    <span class="logo-lg">
                        <img src="{{ asset('img/logo.jpg') }}" alt="logo-light"
                            width="100%">
                    </span>
                </a>
            </div>

            <button type="button" class="btn btn-sm px-3 font-size-16 vertinav-toggle header-item waves-effect"
                id="vertical-menu-btn">
                <i class="fa fa-fw fa-bars"></i>
            </button>

            <button type="button"
                class="btn btn-sm px-3 font-size-16 horinav-toggle header-item waves-effect waves-light"
                data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
                <i class="fa fa-fw fa-bars"></i>
            </button>


        </div>
        <div class="dropdown d-inline-block">
            <h2 class='text'></h2>
        </div>

        <div class="d-flex">
            <div class="dropdown d-inline-block ms-2">

            </div>


            <div class="dropdown d-none d-lg-inline-block ms-1">
                <button type="button" class="btn header-item noti-icon waves-effect" data-toggle="fullscreen">
                    <i class="mdi mdi-fullscreen"></i>
                </button>
            </div>

            <div class="dropdown d-inline-block">
                <button type="button" class="btn header-item waves-effect" id="page-header-user-dropdown"
                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img class="rounded-circle header-profile-user"
                        src="{{ parse_url(admin()->avatar, PHP_URL_SCHEME) == 'https' || parse_url(admin()->avatar, PHP_URL_SCHEME) == 'http'
                            ? admin()->avatar
                            : Storage::url(admin()->avatar) }}"
                        alt="Header Avatar">
                    <span class="d-none d-xl-inline-block ms-1">{{ admin()->name }}</span>
                    <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end">
                    <!-- item-->
                    <h6 class="dropdown-header">Welcome {{ admin()->name }}!</h6>
                    <a class="dropdown-item" href="{{ route('admin.admin_info.show', auth()->id()) }}">
                        <i class="mdi mdi-account-circle text-muted font-size-16 align-middle me-1"></i>
                        <span class="align-middle" key="t-profile">Profile</span>
                    </a>

                    <a class="dropdown-item" href="{{ route('admin.change.password', auth()->id()) }}">
                        <span class="badge bg-success bg-soft text-success mt-1 float-end"> New</span>
                        <i class="mdi mdi-cog-outline text-muted font-size-16 align-middle me-1"></i>
                        <span class="align-middle" key="t-settings">
                            Change Password
                        </span>
                    </a>
                    <a class="dropdown-item" href="{{ route('admin.screen.lock', auth()->id()) }}">
                        <i class="mdi mdi-lock text-muted font-size-16 align-middle me-1"></i>
                        <span class="align-middle" key="t-lock-screen">Lock screen</span>
                    </a>

                    <a class="dropdown-item" href="{{ route('admin.logout') }}"
                        onclick="
                                event.preventDefault();
                                document.getElementById('logout-form').submit();
                                ">
                        <i class="mdi mdi-logout text-muted font-size-16 align-middle me-1"></i>
                        <span class="align-middle" key="t-logout">Logout</span>
                    </a>
                    <button type="button" id="triger_switch_select_modal" style="display: none" data-bs-toggle="modal"
                        data-bs-target=".bs-example-modal-lg">Switch</button>
                    <form id="logout-form" action="{{ route('admin.logout') }}" method="POST" class="d-none">
                        @csrf
                    </form>
                </div>
            </div>
        </div>
    </div>
</header>
