     <!-- ========== Left Sidebar Start ========== -->
     <div class="vertical-menu">

         <div data-simplebar class="h-100">

             <!--- Sidemenu -->
             <div id="sidebar-menu">

                 <!-- Left Menu Start -->
                 <ul class="metismenu list-unstyled" id="side-menu">
                     <li class="menu-title" key="t-menu">Menu</li>

                     <li class="{{ request()->path() ? 'mm-active' : '' }}">
                         <a href="{{ url('admin/dashboard') }}" class="waves-effect">
                             <i class='bx bxs-dashboard'></i>
                             <span key="t-dashboard">Dashboard</span>
                         </a>
                     </li>

                     @canany(['role.show', 'role.create'], 'admin')
                         <li>
                             <a href="javascript: void(0);" class="has-arrow waves-effect">
                                 <i class='bx bx-accessibility'></i>
                                 <span key="t-multi-level">Roles</span>
                             </a>
                             <ul class="sub-menu" aria-expanded="true">
                                 @can('role.show')
                                     <li><a href="{{ route('role.index') }}">{{ __('Role List') }}</a>
                                     </li>
                                 @endcan
                                 @can('role.create')
                                     <li><a href="{{ route('role.create') }}">{{ __('Create Role') }}</a>
                                     </li>
                                 @endcan
                             </ul>
                         </li>
                         <li>
                             <a href="javascript: void(0);" class="has-arrow waves-effect">
                                 <i class='bx bx-accessibility'></i>
                                 <span key="t-multi-level">Permission</span>
                             </a>
                             <ul class="sub-menu" aria-expanded="true">
                                 @can('role.show')
                                     <li><a href="{{ route('permission.index') }}">{{ __('Permission List') }}</a>
                                     </li>
                                 @endcan
                                 @can('role.create')
                                     <li><a href="{{ route('permission.create') }}">{{ __('Create Permission') }}</a>
                                     </li>
                                 @endcan
                             </ul>
                         </li>
                     @endcanany

                     @canany(['user.show', 'user.create'], 'web')
                         <li>
                             <a href="javascript: void(0);" class="has-arrow waves-effect">
                                 <i class='fas fa-users'></i>
                                 <span key="t-multi-level">Users</span>
                             </a>
                             <ul class="sub-menu" aria-expanded="true">
                                 @can('user.show')
                                     <li><a href="{{ route('user.index') }}">{{ __('User List') }}</a>
                                     </li>
                                 @endcan
                                 @can('user.create')
                                     <li><a href="{{ route('user.create') }}">{{ __('Create User') }}</a>
                                     </li>
                                 @endcan
                             </ul>
                         </li>
                     @endcanany


                 </ul>
             </div>
             <!-- Sidebar -->
         </div>
     </div>
     <!-- Left Sidebar End -->
