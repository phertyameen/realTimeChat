'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">real-time-chat-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-f97d3af505a99c94ef70d6cca417c116fddf8461b1c3478049d4d6ba4963edc8d41f23fa0657f917a3a7e7f75f73abb2416d08f4d1ffc15512689711c4ddec66"' : 'data-bs-target="#xs-controllers-links-module-AppModule-f97d3af505a99c94ef70d6cca417c116fddf8461b1c3478049d4d6ba4963edc8d41f23fa0657f917a3a7e7f75f73abb2416d08f4d1ffc15512689711c4ddec66"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-f97d3af505a99c94ef70d6cca417c116fddf8461b1c3478049d4d6ba4963edc8d41f23fa0657f917a3a7e7f75f73abb2416d08f4d1ffc15512689711c4ddec66"' :
                                            'id="xs-controllers-links-module-AppModule-f97d3af505a99c94ef70d6cca417c116fddf8461b1c3478049d4d6ba4963edc8d41f23fa0657f917a3a7e7f75f73abb2416d08f4d1ffc15512689711c4ddec66"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-f97d3af505a99c94ef70d6cca417c116fddf8461b1c3478049d4d6ba4963edc8d41f23fa0657f917a3a7e7f75f73abb2416d08f4d1ffc15512689711c4ddec66"' : 'data-bs-target="#xs-injectables-links-module-AppModule-f97d3af505a99c94ef70d6cca417c116fddf8461b1c3478049d4d6ba4963edc8d41f23fa0657f917a3a7e7f75f73abb2416d08f4d1ffc15512689711c4ddec66"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-f97d3af505a99c94ef70d6cca417c116fddf8461b1c3478049d4d6ba4963edc8d41f23fa0657f917a3a7e7f75f73abb2416d08f4d1ffc15512689711c4ddec66"' :
                                        'id="xs-injectables-links-module-AppModule-f97d3af505a99c94ef70d6cca417c116fddf8461b1c3478049d4d6ba4963edc8d41f23fa0657f917a3a7e7f75f73abb2416d08f4d1ffc15512689711c4ddec66"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PaginationProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaginationProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-d452a865e7bfd4286985fd4128eabec4e51caa7c25ded86fe20c4896fbc8a060b56013c99d1c08753c32634f50038d184089d3990a657d7639d8871ffd7e413b"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-d452a865e7bfd4286985fd4128eabec4e51caa7c25ded86fe20c4896fbc8a060b56013c99d1c08753c32634f50038d184089d3990a657d7639d8871ffd7e413b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-d452a865e7bfd4286985fd4128eabec4e51caa7c25ded86fe20c4896fbc8a060b56013c99d1c08753c32634f50038d184089d3990a657d7639d8871ffd7e413b"' :
                                            'id="xs-controllers-links-module-AuthModule-d452a865e7bfd4286985fd4128eabec4e51caa7c25ded86fe20c4896fbc8a060b56013c99d1c08753c32634f50038d184089d3990a657d7639d8871ffd7e413b"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/GoogleAuthenticationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleAuthenticationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-d452a865e7bfd4286985fd4128eabec4e51caa7c25ded86fe20c4896fbc8a060b56013c99d1c08753c32634f50038d184089d3990a657d7639d8871ffd7e413b"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-d452a865e7bfd4286985fd4128eabec4e51caa7c25ded86fe20c4896fbc8a060b56013c99d1c08753c32634f50038d184089d3990a657d7639d8871ffd7e413b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-d452a865e7bfd4286985fd4128eabec4e51caa7c25ded86fe20c4896fbc8a060b56013c99d1c08753c32634f50038d184089d3990a657d7639d8871ffd7e413b"' :
                                        'id="xs-injectables-links-module-AuthModule-d452a865e7bfd4286985fd4128eabec4e51caa7c25ded86fe20c4896fbc8a060b56013c99d1c08753c32634f50038d184089d3990a657d7639d8871ffd7e413b"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GenerateTokensProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GenerateTokensProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleAuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleAuthenticationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RefreshTokensProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RefreshTokensProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SignInProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignInProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChatModule.html" data-type="entity-link" >ChatModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ChatModule-d9510a3895acb149498757ed79639a5745422b2d0faafc79de56602adda9a571d4045708402a2088b38a9b4608b833bd10097c1842cc497ed503260b6e6c471b"' : 'data-bs-target="#xs-controllers-links-module-ChatModule-d9510a3895acb149498757ed79639a5745422b2d0faafc79de56602adda9a571d4045708402a2088b38a9b4608b833bd10097c1842cc497ed503260b6e6c471b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ChatModule-d9510a3895acb149498757ed79639a5745422b2d0faafc79de56602adda9a571d4045708402a2088b38a9b4608b833bd10097c1842cc497ed503260b6e6c471b"' :
                                            'id="xs-controllers-links-module-ChatModule-d9510a3895acb149498757ed79639a5745422b2d0faafc79de56602adda9a571d4045708402a2088b38a9b4608b833bd10097c1842cc497ed503260b6e6c471b"' }>
                                            <li class="link">
                                                <a href="controllers/ChatRoomController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatRoomController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ChatModule-d9510a3895acb149498757ed79639a5745422b2d0faafc79de56602adda9a571d4045708402a2088b38a9b4608b833bd10097c1842cc497ed503260b6e6c471b"' : 'data-bs-target="#xs-injectables-links-module-ChatModule-d9510a3895acb149498757ed79639a5745422b2d0faafc79de56602adda9a571d4045708402a2088b38a9b4608b833bd10097c1842cc497ed503260b6e6c471b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ChatModule-d9510a3895acb149498757ed79639a5745422b2d0faafc79de56602adda9a571d4045708402a2088b38a9b4608b833bd10097c1842cc497ed503260b6e6c471b"' :
                                        'id="xs-injectables-links-module-ChatModule-d9510a3895acb149498757ed79639a5745422b2d0faafc79de56602adda9a571d4045708402a2088b38a9b4608b833bd10097c1842cc497ed503260b6e6c471b"' }>
                                        <li class="link">
                                            <a href="injectables/ChatRoomService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatRoomService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CloudinaryModule.html" data-type="entity-link" >CloudinaryModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CloudinaryModule-11e4dd5ea057ab89798c41c2b38864991fcd1366cea92100a7be0547805cfed210e13a2ad70c571d117ffc54cc78464ac11918a0b306db2ebbfd674c03265f66"' : 'data-bs-target="#xs-injectables-links-module-CloudinaryModule-11e4dd5ea057ab89798c41c2b38864991fcd1366cea92100a7be0547805cfed210e13a2ad70c571d117ffc54cc78464ac11918a0b306db2ebbfd674c03265f66"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CloudinaryModule-11e4dd5ea057ab89798c41c2b38864991fcd1366cea92100a7be0547805cfed210e13a2ad70c571d117ffc54cc78464ac11918a0b306db2ebbfd674c03265f66"' :
                                        'id="xs-injectables-links-module-CloudinaryModule-11e4dd5ea057ab89798c41c2b38864991fcd1366cea92100a7be0547805cfed210e13a2ad70c571d117ffc54cc78464ac11918a0b306db2ebbfd674c03265f66"' }>
                                        <li class="link">
                                            <a href="injectables/CloudinaryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CloudinaryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GoogleAuthticationModule.html" data-type="entity-link" >GoogleAuthticationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-GoogleAuthticationModule-c1b61f15142dc62e60e27f4773ed6ed9b939ca10eea9538feb38df0237fe0dd3d3c3ecfa667f608d7d704cb821fe96fb5f3b3d52777e6d99db04a3bb90b62ee5"' : 'data-bs-target="#xs-controllers-links-module-GoogleAuthticationModule-c1b61f15142dc62e60e27f4773ed6ed9b939ca10eea9538feb38df0237fe0dd3d3c3ecfa667f608d7d704cb821fe96fb5f3b3d52777e6d99db04a3bb90b62ee5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-GoogleAuthticationModule-c1b61f15142dc62e60e27f4773ed6ed9b939ca10eea9538feb38df0237fe0dd3d3c3ecfa667f608d7d704cb821fe96fb5f3b3d52777e6d99db04a3bb90b62ee5"' :
                                            'id="xs-controllers-links-module-GoogleAuthticationModule-c1b61f15142dc62e60e27f4773ed6ed9b939ca10eea9538feb38df0237fe0dd3d3c3ecfa667f608d7d704cb821fe96fb5f3b3d52777e6d99db04a3bb90b62ee5"' }>
                                            <li class="link">
                                                <a href="controllers/GoogleAuthenticationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleAuthenticationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-GoogleAuthticationModule-c1b61f15142dc62e60e27f4773ed6ed9b939ca10eea9538feb38df0237fe0dd3d3c3ecfa667f608d7d704cb821fe96fb5f3b3d52777e6d99db04a3bb90b62ee5"' : 'data-bs-target="#xs-injectables-links-module-GoogleAuthticationModule-c1b61f15142dc62e60e27f4773ed6ed9b939ca10eea9538feb38df0237fe0dd3d3c3ecfa667f608d7d704cb821fe96fb5f3b3d52777e6d99db04a3bb90b62ee5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GoogleAuthticationModule-c1b61f15142dc62e60e27f4773ed6ed9b939ca10eea9538feb38df0237fe0dd3d3c3ecfa667f608d7d704cb821fe96fb5f3b3d52777e6d99db04a3bb90b62ee5"' :
                                        'id="xs-injectables-links-module-GoogleAuthticationModule-c1b61f15142dc62e60e27f4773ed6ed9b939ca10eea9538feb38df0237fe0dd3d3c3ecfa667f608d7d704cb821fe96fb5f3b3d52777e6d99db04a3bb90b62ee5"' }>
                                        <li class="link">
                                            <a href="injectables/GoogleAuthenticationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleAuthenticationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-9bbf51d47d240d618a22d70f58ad5523776c168a27411f220f7dd5a13784395718731c2511a6a823c9dcf3b5b7a73653cdb8942cb793626e77f0442c017aa8a2"' : 'data-bs-target="#xs-injectables-links-module-MailModule-9bbf51d47d240d618a22d70f58ad5523776c168a27411f220f7dd5a13784395718731c2511a6a823c9dcf3b5b7a73653cdb8942cb793626e77f0442c017aa8a2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-9bbf51d47d240d618a22d70f58ad5523776c168a27411f220f7dd5a13784395718731c2511a6a823c9dcf3b5b7a73653cdb8942cb793626e77f0442c017aa8a2"' :
                                        'id="xs-injectables-links-module-MailModule-9bbf51d47d240d618a22d70f58ad5523776c168a27411f220f7dd5a13784395718731c2511a6a823c9dcf3b5b7a73653cdb8942cb793626e77f0442c017aa8a2"' }>
                                        <li class="link">
                                            <a href="injectables/MailProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MessageModule.html" data-type="entity-link" >MessageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MessageModule-39c8c1cc366d90e204a8260780ae5c44c80d7d72efbbef07df5b199ec3ddccf7a714de1f33b70478dcfcdb7a8e35e7999e09caecb7c88e12a23d2b3bbf7c7629"' : 'data-bs-target="#xs-controllers-links-module-MessageModule-39c8c1cc366d90e204a8260780ae5c44c80d7d72efbbef07df5b199ec3ddccf7a714de1f33b70478dcfcdb7a8e35e7999e09caecb7c88e12a23d2b3bbf7c7629"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MessageModule-39c8c1cc366d90e204a8260780ae5c44c80d7d72efbbef07df5b199ec3ddccf7a714de1f33b70478dcfcdb7a8e35e7999e09caecb7c88e12a23d2b3bbf7c7629"' :
                                            'id="xs-controllers-links-module-MessageModule-39c8c1cc366d90e204a8260780ae5c44c80d7d72efbbef07df5b199ec3ddccf7a714de1f33b70478dcfcdb7a8e35e7999e09caecb7c88e12a23d2b3bbf7c7629"' }>
                                            <li class="link">
                                                <a href="controllers/MessageController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessageController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MessageModule-39c8c1cc366d90e204a8260780ae5c44c80d7d72efbbef07df5b199ec3ddccf7a714de1f33b70478dcfcdb7a8e35e7999e09caecb7c88e12a23d2b3bbf7c7629"' : 'data-bs-target="#xs-injectables-links-module-MessageModule-39c8c1cc366d90e204a8260780ae5c44c80d7d72efbbef07df5b199ec3ddccf7a714de1f33b70478dcfcdb7a8e35e7999e09caecb7c88e12a23d2b3bbf7c7629"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MessageModule-39c8c1cc366d90e204a8260780ae5c44c80d7d72efbbef07df5b199ec3ddccf7a714de1f33b70478dcfcdb7a8e35e7999e09caecb7c88e12a23d2b3bbf7c7629"' :
                                        'id="xs-injectables-links-module-MessageModule-39c8c1cc366d90e204a8260780ae5c44c80d7d72efbbef07df5b199ec3ddccf7a714de1f33b70478dcfcdb7a8e35e7999e09caecb7c88e12a23d2b3bbf7c7629"' }>
                                        <li class="link">
                                            <a href="injectables/CloudinaryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CloudinaryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MessageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessageService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaginationModule.html" data-type="entity-link" >PaginationModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaginationModule-d372da757bcdda5a96285339e13fed9cb4cca189fbf00f7251246d03ec3eac1a76a1ffd0d1d286ebac7f6f7b02641b6d7f553c3b4f9dd0154a6c9dc248aacbc2"' : 'data-bs-target="#xs-injectables-links-module-PaginationModule-d372da757bcdda5a96285339e13fed9cb4cca189fbf00f7251246d03ec3eac1a76a1ffd0d1d286ebac7f6f7b02641b6d7f553c3b4f9dd0154a6c9dc248aacbc2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaginationModule-d372da757bcdda5a96285339e13fed9cb4cca189fbf00f7251246d03ec3eac1a76a1ffd0d1d286ebac7f6f7b02641b6d7f553c3b4f9dd0154a6c9dc248aacbc2"' :
                                        'id="xs-injectables-links-module-PaginationModule-d372da757bcdda5a96285339e13fed9cb4cca189fbf00f7251246d03ec3eac1a76a1ffd0d1d286ebac7f6f7b02641b6d7f553c3b4f9dd0154a6c9dc248aacbc2"' }>
                                        <li class="link">
                                            <a href="injectables/PaginationProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaginationProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-d20cb4312cb89158b818690d7dc0e5e06bd9974e14b1ef97c2eb412ca4402e0c093d0bfc4e155434ddc157e86075cbe1de16d8bfd2adca7c23d62cd8d10b88a8"' : 'data-bs-target="#xs-controllers-links-module-UserModule-d20cb4312cb89158b818690d7dc0e5e06bd9974e14b1ef97c2eb412ca4402e0c093d0bfc4e155434ddc157e86075cbe1de16d8bfd2adca7c23d62cd8d10b88a8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-d20cb4312cb89158b818690d7dc0e5e06bd9974e14b1ef97c2eb412ca4402e0c093d0bfc4e155434ddc157e86075cbe1de16d8bfd2adca7c23d62cd8d10b88a8"' :
                                            'id="xs-controllers-links-module-UserModule-d20cb4312cb89158b818690d7dc0e5e06bd9974e14b1ef97c2eb412ca4402e0c093d0bfc4e155434ddc157e86075cbe1de16d8bfd2adca7c23d62cd8d10b88a8"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-d20cb4312cb89158b818690d7dc0e5e06bd9974e14b1ef97c2eb412ca4402e0c093d0bfc4e155434ddc157e86075cbe1de16d8bfd2adca7c23d62cd8d10b88a8"' : 'data-bs-target="#xs-injectables-links-module-UserModule-d20cb4312cb89158b818690d7dc0e5e06bd9974e14b1ef97c2eb412ca4402e0c093d0bfc4e155434ddc157e86075cbe1de16d8bfd2adca7c23d62cd8d10b88a8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-d20cb4312cb89158b818690d7dc0e5e06bd9974e14b1ef97c2eb412ca4402e0c093d0bfc4e155434ddc157e86075cbe1de16d8bfd2adca7c23d62cd8d10b88a8"' :
                                        'id="xs-injectables-links-module-UserModule-d20cb4312cb89158b818690d7dc0e5e06bd9974e14b1ef97c2eb412ca4402e0c093d0bfc4e155434ddc157e86075cbe1de16d8bfd2adca7c23d62cd8d10b88a8"' }>
                                        <li class="link">
                                            <a href="injectables/CreateGoogleUserProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateGoogleUserProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CreateUserProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateUserProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindOneByEmail.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindOneByEmail</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindOneByGoogleIdProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindOneByGoogleIdProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PaginationProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaginationProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WebSocketModule.html" data-type="entity-link" >WebSocketModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ChatRoomController.html" data-type="entity-link" >ChatRoomController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/GoogleAuthenticationController.html" data-type="entity-link" >GoogleAuthenticationController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MessageController.html" data-type="entity-link" >MessageController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/ChatRoom.html" data-type="entity-link" >ChatRoom</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Message.html" data-type="entity-link" >Message</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateChatRoomDto.html" data-type="entity-link" >CreateChatRoomDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMessageDto.html" data-type="entity-link" >CreateMessageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditUserDto.html" data-type="entity-link" >EditUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetuserParamDto.html" data-type="entity-link" >GetuserParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GoogleTokenDto.html" data-type="entity-link" >GoogleTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MatchPasswordsConstraint.html" data-type="entity-link" >MatchPasswordsConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/Paginated.html" data-type="entity-link" >Paginated</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationQueryDto.html" data-type="entity-link" >PaginationQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenDto.html" data-type="entity-link" >RefreshTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateChatRoomDto.html" data-type="entity-link" >UpdateChatRoomDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMessageDto.html" data-type="entity-link" >UpdateMessageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/WebsocketGateway.html" data-type="entity-link" >WebsocketGateway</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BcryptProvider.html" data-type="entity-link" >BcryptProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChatRoomService.html" data-type="entity-link" >ChatRoomService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CloudinaryService.html" data-type="entity-link" >CloudinaryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateGoogleUserProvider.html" data-type="entity-link" >CreateGoogleUserProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateUserProvider.html" data-type="entity-link" >CreateUserProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataResponseInterceptor.html" data-type="entity-link" >DataResponseInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FindOneByEmail.html" data-type="entity-link" >FindOneByEmail</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FindOneByGoogleIdProvider.html" data-type="entity-link" >FindOneByGoogleIdProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GenerateTokensProvider.html" data-type="entity-link" >GenerateTokensProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleAuthenticationService.html" data-type="entity-link" >GoogleAuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HashingProvider.html" data-type="entity-link" >HashingProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailProvider.html" data-type="entity-link" >MailProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessageService.html" data-type="entity-link" >MessageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaginationProvider.html" data-type="entity-link" >PaginationProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RefreshTokensProvider.html" data-type="entity-link" >RefreshTokensProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SignInProvider.html" data-type="entity-link" >SignInProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AccessTokenGuard.html" data-type="entity-link" >AccessTokenGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuardGuard.html" data-type="entity-link" >AuthGuardGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/WebSocketGuardGuard.html" data-type="entity-link" >WebSocketGuardGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ActiveUserData.html" data-type="entity-link" >ActiveUserData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GoogleInterface.html" data-type="entity-link" >GoogleInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestWithUser.html" data-type="entity-link" >RequestWithUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServerToClientEvents.html" data-type="entity-link" >ServerToClientEvents</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});