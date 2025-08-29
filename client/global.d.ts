// Ovaj fajl sluzi da popravi gresku koju izbacuje typescript za koriscenje ionic iconica u fajlovima

import "react";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Add any custom attributes here if needed
  }

  interface IntrinsicElements {
    "ion-icon": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      name: string;
      size?: string;
      color?: string;
      // Add any other props you use with ion-icon
    };
  }
}
