import { inject } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Faixa } from "src/app/models/faixa.model";
import { FaixaService } from "src/app/services/faixa.service";

export const faixaResolver: ResolveFn<Faixa> = 
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(FaixaService).findById(route.paramMap.get('id')!);
    };
