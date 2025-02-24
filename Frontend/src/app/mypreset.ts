import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{teal.50}',
      100: '{teal.100}',
      200: '{teal.200}',
      300: '{teal.400}',
      400: '{teal.500}',
      500: '{teal.500}',
      600: '{teal.600}',
      700: '{teal.700}',
      800: '{teal.800}',
      900: '{teal.900}',
      950: '{teal.950}',
    },
  },
  components: {
    stepper: {
      separator: {
        background: '{content.border.color}',
        activeBackground: '{primary.color}',
        margin: '0 0 0 1.625rem',
        size: '2px',
      },
      step: {
        padding: '0.5rem',
        gap: '1rem',
      },
      stepHeader: {
        padding: '0',
        borderRadius: '{content.border.radius}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
        gap: '0.5rem',
      },
      stepTitle: {
        color: '{text.muted.color}',
        activeColor: '{primary.color}',
        fontWeight: '500',
      },
      stepNumber: {
        background: '#ffffff',
        activeBackground: '#ffffff',
        borderColor: '{content.border.color}',
        activeBorderColor: '{teal.400}',
        color: '{text.muted.color}',
        activeColor: '{primary.color}',
        size: '2rem',
        fontSize: '1.143rem',
        fontWeight: '500',
        borderRadius: '50%',
        shadow:
          '0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)',
      },
      steppanels: {
        padding: '0.875rem 0.5rem 1.125rem 0.5rem',
      },
      steppanel: {
        background: '{content.background}',
        color: '{content.color}',
        padding: '0',
        indent: '1rem',
      },
    },
    datatable: {
      root: {
        background: '#ffffff',
      },
      header: {
        background: '#f1f5f9',
        color: '#333333',
        fontWeight: 'bold',
        borderBottom: '2px solid #d1d5db',
      },
      body: {
        background: '#ffffff',
        color: '#000000',
      },
      row: {
        background: '#ffffff',
        hoverBackground: '#e5e7eb',
        color: 'black',
      },
      footer: {
        background: '#f1f5f9',
        color: '#333333',
      },
      cell: {
        padding: '10px',
        borderBottom: '1px solid #d1d5db',
        color: 'black',
      },
    },
    inputtext: {
      root: {
        background: '#ffffff',
        borderColor: '#d1d5db',
        padding: '6px',
        color: 'black',
      },
    },
    button: {
      root: {
        background: '#ffffff',
        color: '#ffffff',
        padding: '8px',
      },
      iconOnly: {
        fontSize: '1rem',
      },
    },
    select: {
      background: '#ffffff',
      borderColor: '#d1d5db',
      color: 'black',
      filledBackground: '#ffffff',
      overlayBackground: '#ffffff',
      overlay: {
        color: 'black',
      },
      option: {
        focusBackground: '{primary.color}',
        selectedBackground: '#ffffff',
        color: 'black',
        selected: {
          color: 'black',
          focusColor: 'black',
        },
      },
    },
  },
});
