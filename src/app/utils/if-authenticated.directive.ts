import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
    selector: '[ifAuthenticated]'
})
export class IfAuthenticatedDirective {
    private authSrv = inject(AuthService);
    private templateRef = inject(TemplateRef<unknown>);
    private viewContainer = inject(ViewContainerRef);

    expected = input(true, {
        alias: 'ifAuthenticated',
        transform: (value: boolean | '') => value === '' || value,
    });

    elseTemplate = input<TemplateRef<unknown> | null>(null, { alias: 'ifAuthenticatedElse' });

    private currentTemplate: TemplateRef<unknown> | null = null;

    constructor() {
        effect(() => {
            const matches = this.authSrv.isAuthenticated() === this.expected();
            this.updateView(matches ? this.templateRef : this.elseTemplate());
        });
    }

    private updateView(template: TemplateRef<unknown> | null) {
        if (template === this.currentTemplate) return;

        this.viewContainer.clear();
        this.currentTemplate = template;

        if (template) {
            this.viewContainer.createEmbeddedView(template);
        }
    }
}