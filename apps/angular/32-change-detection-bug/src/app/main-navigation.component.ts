import { Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FakeServiceService } from './fake.service';

interface MenuItem {
  path: string;
  name: string;
}

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  template: `
    @for (menu of menus(); track menu.path) {
      <a
        class="rounded-md border px-4 py-2"
        [routerLink]="menu.path"
        routerLinkActive="isSelected">
        {{ menu.name }}
      </a>
    }
  `,
  styles: `
    @reference "tailwindcss";
    a.isSelected {
      @apply bg-gray-600 text-white;
    }
  `,
  host: {
    class: 'flex flex-col p-2 gap-2',
  },
})
export class NavigationComponent {
  menus = input.required<MenuItem[]>();
}

@Component({
  imports: [NavigationComponent],
  template: `
    <app-nav [menus]="menus()" />
  `,
  host: {},
})
export class MainNavigationComponent {
  private fakeBackend = inject(FakeServiceService);

  readonly info = toSignal(this.fakeBackend.getInfoFromBackend(), {
    initialValue: '',
  });

  readonly menus = computed<MenuItem[]>(() => [
    { path: '/foo', name: `Foo ${this.info()}` },
    { path: '/bar', name: `Bar ${this.info()}` },
  ]);
}
