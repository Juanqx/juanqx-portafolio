/* empty css                          */
import { e as createComponent, r as renderTemplate, g as addAttribute, i as renderComponent, j as renderHead, k as renderSlot, h as createAstro, m as maybeRenderHead } from '../astro_DYzw0DtZ.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$ViewTransitions } from './index_Vo7-ZaeL.mjs';
/* empty css                              */

const $$Astro = createAstro();
const $$LayoutProyect = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LayoutProyect;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="../../public/imgLogo.png"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}${renderHead()}</head> <body class="p-4 max-w-[1093px] mx-auto"> <!-- contenido de la página --> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/home/juanqxk/Documentos/Programacion/Frontend/juanqx-portafolio/src/layouts/LayoutProyect.astro", void 0);

const $$Proyecto1 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LayoutProyect", $$LayoutProyect, { "title": "Proyecto - EquirentControl" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="font-extrabold text-lg text-text-color-primary text-center mt-2 sm:text-xl md:text-3xl">EquirentControl - Software para el control de rentas.</h1> <p class="font-medium text-base text-text-color-secondary my-7 xl:text-lg">EquirentControl es una aplicación web desarrollada con la finalidad de mejorar el flujo de trabajo de un negocio local llamado “EquiRent” dedicado a la renta de baños portatiles en la ciudad de Campeche, México. <br>
Participé en todo el proceso de desarrollo de este proyecto con un cargo de desarrollador fullstack, desde la toma de requirimientos hasta el desarrollo de diferentes tareas tanto en la parte del frontend como en la del backend. <br>
La aplicación le permite al negocio contar con un inventario de los baños con los que cuentan además de poder modificar información de los mismos. También permite tener una lista de los clientes y un historial de las rentas realizadas, pudiendo consultar las rentas que se encuentran activas, las que estan apunto de vencer y las que ya finalizaron. <br>
La necesidad de llevar acabo este proyecto radica en que los procesos mencionados anteriormente se realizaban de manera física en hojas de papel, por lo que la implementación de este sistema permitiría un mejor manejo de la información, así como también un aumento en la productividad de todos los procesos.</p> <section class="flex flex-col gap-3 my-6 sm:gap-7 sm:flex-row lg:gap-16 flex-wrap"> <article> <h3 class="font-bold text-sm">Tecnologías Usadas</h3> <h4 class="font-medium text-sm text-text-color-secondary">Javascript / Bootstrap / NodeJs / ExpressJs /EJS / Mysql.</h4> </article> <article> <h3 class="font-bold text-sm">Mi rol</h3> <h4 class="font-medium text-sm text-text-color-secondary">Diseño / Frontend / Backend / Bases de datos.</h4> </article> <article> <h3 class="font-bold text-sm">Año</h3> <h4 class="font-medium text-sm text-text-color-secondary">2022.</h4> </article> </section> <a href="javascript:history.back()" class="bg-secondary-color flex flex-row gap-1 items-center w-max py-2 pl-2 pr-4 rounded-2xl font-bold text-sm text-primary-color my-7 mx-auto sm:mx-0"><img src="../../public/flechaAtras.png" alt="">Regresar</a> <div class="flex flex-row gap-3 w-max mx-auto my-4"> <!-- <img src="../../public/red.png" alt="github"> --> <a href="https://github.com/Juanqx/EquirentControl" target="_blank"><img src="../../public/githubProyect.png" alt="red"></a> </div> <section class="max-w-[1093px] flex flex-col gap-3 pb-3"> <article><img src="../../public/proyectos/equirentGrande1.png" alt="proyecto1"></article> <article><img src="../../public/proyectos/equirentGrande2.png" alt="proyecto1"></article> </section> ` })}`;
}, "/home/juanqxk/Documentos/Programacion/Frontend/juanqx-portafolio/src/pages/proyecto1.astro", void 0);

const $$file = "/home/juanqxk/Documentos/Programacion/Frontend/juanqx-portafolio/src/pages/proyecto1.astro";
const $$url = "/proyecto1";

const proyecto1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Proyecto1,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$LayoutProyect as $, proyecto1 as p };
