import { Component, Injectable, inject } from "@angular/core"
import { Router } from "@angular/router"
import { CommonModule, DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';


export const loginGuard = () => {
    const localStorage = document.defaultView?.localStorage;
    

    const router = inject(Router);

    if(localStorage && localStorage.getItem("TOKEN")) {
        return true;
    }else{
        router.navigate(["./"])
        return false;
    }

}

