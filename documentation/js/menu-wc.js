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
                                            'data-bs-target="#controllers-links-module-AppModule-25f882b5920b0e691dd5f51a75634807330a979721f098845fc44d00e22889d04e2a3cb4d965d81f90ccde785972bb3f8da81de767652d01935fb813b28a08ad"' : 'data-bs-target="#xs-controllers-links-module-AppModule-25f882b5920b0e691dd5f51a75634807330a979721f098845fc44d00e22889d04e2a3cb4d965d81f90ccde785972bb3f8da81de767652d01935fb813b28a08ad"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-25f882b5920b0e691dd5f51a75634807330a979721f098845fc44d00e22889d04e2a3cb4d965d81f90ccde785972bb3f8da81de767652d01935fb813b28a08ad"' :
                                            'id="xs-controllers-links-module-AppModule-25f882b5920b0e691dd5f51a75634807330a979721f098845fc44d00e22889d04e2a3cb4d965d81f90ccde785972bb3f8da81de767652d01935fb813b28a08ad"' }>
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
                                        'data-bs-target="#injectables-links-module-AppModule-25f882b5920b0e691dd5f51a75634807330a979721f098845fc44d00e22889d04e2a3cb4d965d81f90ccde785972bb3f8da81de767652d01935fb813b28a08ad"' : 'data-bs-target="#xs-injectables-links-module-AppModule-25f882b5920b0e691dd5f51a75634807330a979721f098845fc44d00e22889d04e2a3cb4d965d81f90ccde785972bb3f8da81de767652d01935fb813b28a08ad"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-25f882b5920b0e691dd5f51a75634807330a979721f098845fc44d00e22889d04e2a3cb4d965d81f90ccde785972bb3f8da81de767652d01935fb813b28a08ad"' :
                                        'id="xs-injectables-links-module-AppModule-25f882b5920b0e691dd5f51a75634807330a979721f098845fc44d00e22889d04e2a3cb4d965d81f90ccde785972bb3f8da81de767652d01935fb813b28a08ad"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
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
                                <a href="modules/ChatroomsModule.html" data-type="entity-link" >ChatroomsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ChatroomsModule-bb0a2aa0f0728d3b450d4908060b22de1b4c47828f2efd44a7e90ce8a56c16cbda7126419c73acf6b1096c2a9f6e344b760eaaa27617ba559d4ae0af82a190f9"' : 'data-bs-target="#xs-controllers-links-module-ChatroomsModule-bb0a2aa0f0728d3b450d4908060b22de1b4c47828f2efd44a7e90ce8a56c16cbda7126419c73acf6b1096c2a9f6e344b760eaaa27617ba559d4ae0af82a190f9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ChatroomsModule-bb0a2aa0f0728d3b450d4908060b22de1b4c47828f2efd44a7e90ce8a56c16cbda7126419c73acf6b1096c2a9f6e344b760eaaa27617ba559d4ae0af82a190f9"' :
                                            'id="xs-controllers-links-module-ChatroomsModule-bb0a2aa0f0728d3b450d4908060b22de1b4c47828f2efd44a7e90ce8a56c16cbda7126419c73acf6b1096c2a9f6e344b760eaaa27617ba559d4ae0af82a190f9"' }>
                                            <li class="link">
                                                <a href="controllers/ChatRoomsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatRoomsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ChatroomsModule-bb0a2aa0f0728d3b450d4908060b22de1b4c47828f2efd44a7e90ce8a56c16cbda7126419c73acf6b1096c2a9f6e344b760eaaa27617ba559d4ae0af82a190f9"' : 'data-bs-target="#xs-injectables-links-module-ChatroomsModule-bb0a2aa0f0728d3b450d4908060b22de1b4c47828f2efd44a7e90ce8a56c16cbda7126419c73acf6b1096c2a9f6e344b760eaaa27617ba559d4ae0af82a190f9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ChatroomsModule-bb0a2aa0f0728d3b450d4908060b22de1b4c47828f2efd44a7e90ce8a56c16cbda7126419c73acf6b1096c2a9f6e344b760eaaa27617ba559d4ae0af82a190f9"' :
                                        'id="xs-injectables-links-module-ChatroomsModule-bb0a2aa0f0728d3b450d4908060b22de1b4c47828f2efd44a7e90ce8a56c16cbda7126419c73acf6b1096c2a9f6e344b760eaaa27617ba559d4ae0af82a190f9"' }>
                                        <li class="link">
                                            <a href="injectables/ChatRoomsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatRoomsService</a>
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
                                <a href="modules/MessagesModule.html" data-type="entity-link" >MessagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MessagesModule-29bf1180dd6e4a18c64290f1263f9ad2095eef85b2fcfb12160d181571486ea99ae37d90385e21014e9062b4b3c27dfdbb87f6356e4df6e23702c885db2683eb"' : 'data-bs-target="#xs-controllers-links-module-MessagesModule-29bf1180dd6e4a18c64290f1263f9ad2095eef85b2fcfb12160d181571486ea99ae37d90385e21014e9062b4b3c27dfdbb87f6356e4df6e23702c885db2683eb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MessagesModule-29bf1180dd6e4a18c64290f1263f9ad2095eef85b2fcfb12160d181571486ea99ae37d90385e21014e9062b4b3c27dfdbb87f6356e4df6e23702c885db2683eb"' :
                                            'id="xs-controllers-links-module-MessagesModule-29bf1180dd6e4a18c64290f1263f9ad2095eef85b2fcfb12160d181571486ea99ae37d90385e21014e9062b4b3c27dfdbb87f6356e4df6e23702c885db2683eb"' }>
                                            <li class="link">
                                                <a href="controllers/MessagesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessagesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MessagesModule-29bf1180dd6e4a18c64290f1263f9ad2095eef85b2fcfb12160d181571486ea99ae37d90385e21014e9062b4b3c27dfdbb87f6356e4df6e23702c885db2683eb"' : 'data-bs-target="#xs-injectables-links-module-MessagesModule-29bf1180dd6e4a18c64290f1263f9ad2095eef85b2fcfb12160d181571486ea99ae37d90385e21014e9062b4b3c27dfdbb87f6356e4df6e23702c885db2683eb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MessagesModule-29bf1180dd6e4a18c64290f1263f9ad2095eef85b2fcfb12160d181571486ea99ae37d90385e21014e9062b4b3c27dfdbb87f6356e4df6e23702c885db2683eb"' :
                                        'id="xs-injectables-links-module-MessagesModule-29bf1180dd6e4a18c64290f1263f9ad2095eef85b2fcfb12160d181571486ea99ae37d90385e21014e9062b4b3c27dfdbb87f6356e4df6e23702c885db2683eb"' }>
                                        <li class="link">
                                            <a href="injectables/MessagesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessagesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-062be234e38500f3a65f1235f7070de430495c725c294fe8cce7cc47ad066a1f343992c7cac3b697c31f274dbde4785e04acd16fd98452b9d9b57668b2384c49"' : 'data-bs-target="#xs-controllers-links-module-UserModule-062be234e38500f3a65f1235f7070de430495c725c294fe8cce7cc47ad066a1f343992c7cac3b697c31f274dbde4785e04acd16fd98452b9d9b57668b2384c49"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-062be234e38500f3a65f1235f7070de430495c725c294fe8cce7cc47ad066a1f343992c7cac3b697c31f274dbde4785e04acd16fd98452b9d9b57668b2384c49"' :
                                            'id="xs-controllers-links-module-UserModule-062be234e38500f3a65f1235f7070de430495c725c294fe8cce7cc47ad066a1f343992c7cac3b697c31f274dbde4785e04acd16fd98452b9d9b57668b2384c49"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-062be234e38500f3a65f1235f7070de430495c725c294fe8cce7cc47ad066a1f343992c7cac3b697c31f274dbde4785e04acd16fd98452b9d9b57668b2384c49"' : 'data-bs-target="#xs-injectables-links-module-UserModule-062be234e38500f3a65f1235f7070de430495c725c294fe8cce7cc47ad066a1f343992c7cac3b697c31f274dbde4785e04acd16fd98452b9d9b57668b2384c49"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-062be234e38500f3a65f1235f7070de430495c725c294fe8cce7cc47ad066a1f343992c7cac3b697c31f274dbde4785e04acd16fd98452b9d9b57668b2384c49"' :
                                        'id="xs-injectables-links-module-UserModule-062be234e38500f3a65f1235f7070de430495c725c294fe8cce7cc47ad066a1f343992c7cac3b697c31f274dbde4785e04acd16fd98452b9d9b57668b2384c49"' }>
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
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
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
                                    <a href="controllers/ChatRoomsController.html" data-type="entity-link" >ChatRoomsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/GoogleAuthenticationController.html" data-type="entity-link" >GoogleAuthenticationController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MessagesController.html" data-type="entity-link" >MessagesController</a>
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
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto-1.html" data-type="entity-link" >CreateUserDto</a>
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
                                <a href="classes/MatchPasswordsConstraint-1.html" data-type="entity-link" >MatchPasswordsConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenDto.html" data-type="entity-link" >RefreshTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
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
                                    <a href="injectables/ChatRoomsService.html" data-type="entity-link" >ChatRoomsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateGoogleUserProvider.html" data-type="entity-link" >CreateGoogleUserProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateUserProvider.html" data-type="entity-link" >CreateUserProvider</a>
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
                                    <a href="injectables/MessagesService.html" data-type="entity-link" >MessagesService</a>
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
                                <a href="guards/AuthGuardGuard.html" data-type="entity-link" >AuthGuardGuard</a>
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