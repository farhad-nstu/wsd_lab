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
            <h2 class='text'><img width="50px" src="{{ asset('img/logo.jpg') }}"
                    alt=""></h2>
        </div>

        <div class="d-flex">
            <div class="dropdown d-inline-block ms-2">

            </div>


            <div class="dropdown d-none d-lg-inline-block ms-1">
                <button type="button" class="btn header-item noti-icon waves-effect" data-toggle="fullscreen">
                    <i class="mdi mdi-fullscreen"></i>
                </button>
            </div>
            {{-- notification part --}}
            {{-- <div class="dropdown d-inline-block">
                <button type="button" class="btn header-item noti-icon waves-effect"
                    id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                    <i class="mdi mdi-bell"></i>
                    <span class="badge bg-danger rounded-pill">3</span>
                </button>
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                    aria-labelledby="page-header-notifications-dropdown">
                    <div class="p-3">
                        <div class="row align-items-center">
                            <div class="col">
                                <h6 class="m-0"> Notifications </h6>
                            </div>
                            <div class="col-auto">
                                <a href="#" class="small" key="t-view-all"> View All</a>
                            </div>
                        </div>
                    </div>
                    <div data-simplebar style="max-height: 230px;">
                        <a href="#" class="text-reset notification-item d-block active">
                            <div class="d-flex">
                                <div class="flex-shrink-0 me-3">
                                    <div class="avatar-xs">
                                        <span class="avatar-title bg-primary rounded-circle font-size-16">
                                            <i class="bx bx-cart"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="mb-1" key="t-your-order">Your order is placed</h6>
                                    <div class="font-size-13 text-muted">
                                        <p class="mb-1" key="t-grammer">If several languages coalesce the grammar</p>
                                        <p class="mb-0 font-size-12"><i class="mdi mdi-clock-outline"></i> <span
                                                key="t-min-ago">3 min ago</span></p>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a href="#" class="text-reset notification-item d-block ">
                            <div class="d-flex">
                                <div class="flex-shrink-0 me-3">
                                    <img src="assets/images/users/avatar-3.jpg" class="rounded-circle avatar-xs"
                                        alt="user-pic">
                                </div>

                                <div class="flex-grow-1">
                                    <h6 class="mb-1">James Lemire</h6>
                                    <div class="font-size-13 text-muted">
                                        <p class="mb-1" key="t-simplified">It will seem like simplified English.</p>
                                        <p class="mb-0 font-size-12"><i class="mdi mdi-clock-outline"></i> <span
                                                key="t-hours-ago">1 hour ago</span></p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="p-2 border-top d-grid">
                        <a class="btn btn-sm btn-link font-size-14 text-center" href="javascript:void(0)">
                            <i class="mdi mdi-arrow-right-circle me-1"></i> <span>View More..</span>
                        </a>
                    </div>
                </div>
            </div> --}}


            <div class="dropdown d-inline-block">
                <button type="button" class="btn header-item waves-effect" id="page-header-user-dropdown"
                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img class="rounded-circle header-profile-user"
                        src="{{ parse_url(user()->avatar, PHP_URL_SCHEME) == 'https' || parse_url(user()->avatar, PHP_URL_SCHEME) == 'http'
                            ? user()->avatar
                            : Storage::url(user()->avatar) }}"
                        alt="Header Avatar">
                    <span class="d-none d-xl-inline-block ms-1">{{ user()->name }}</span>
                    <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end">
                    <!-- item-->
                    <h6 class="dropdown-header">Welcome {{ user()->name }}!</h6>
                    <a class="dropdown-item" href="{{ route('user.user_info.show', auth()->id()) }}">
                        <i class="mdi mdi-account-circle text-muted font-size-16 align-middle me-1"></i>
                        <span class="align-middle" key="t-profile">Profile</span>
                    </a>
                    <a class="dropdown-item" href="{{ route('user.change.password', auth()->id()) }}">
                        <span class="badge bg-success bg-soft text-success mt-1 float-end"> New</span>
                        <i class="mdi mdi-cog-outline text-muted font-size-16 align-middle me-1"></i>
                        <span class="align-middle" key="t-settings">
                            Change Password
                        </span>
                    </a>
                    <a class="dropdown-item" href="{{ route('user.screen.lock', auth()->id()) }}">
                        <i class="mdi mdi-lock text-muted font-size-16 align-middle me-1"></i>
                        <span class="align-middle" key="t-lock-screen">Lock screen</span>
                    </a>

                    <a class="dropdown-item" href="{{ route('logout') }}"
                        onclick="
                                event.preventDefault();
                                document.getElementById('logout-form').submit();
                                ">
                        <i class="mdi mdi-logout text-muted font-size-16 align-middle me-1"></i>
                        <span class="align-middle" key="t-logout">Logout</span>
                    </a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                        @csrf
                    </form>
                </div>
            </div>
        </div>
    </div>
</header>
