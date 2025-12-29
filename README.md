Basic invoice generator: 
1. it consits a new invoice button. On clicking it it will open a form to the user to create their invoice.
2. This form includes bill from, bill to, items lists with add, delete, edit buttons, summary(sub-total,tax(18%),grand-total) with create and cancel button
3. After filling all the field in the form and on clicking the create button it will be stored in the home page as invoice list with invoice id, duedate , client name and amount to be paid with preview button.
4.On clickg cancel the below and x button on top the form closed and attain its initialstae with empty fields.
5. On click of preview button we can see the preview of the invoice created by us. It consists invoice no and date of incoice,due date to pay the amount, sender info, slient info, summary of produts with item-name, quantity, unit rate and cost of the product based on the quantity* unit rate of that product. A download and close button is present to download the invoice as pdf format and on clicking close button the preview gets closed and remais in the home page as invoice list created by us.
6. On creting the invoice based on products nad addition, deletion the subtotal,grand-total,tax gets updated dynamically.
7. On clicking the new invoice button we can create multiple invoices. and all the created invoices are listed as a list with the required details with preview button.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
