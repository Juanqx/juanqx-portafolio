import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_DYzw0DtZ.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.B8e_A8KY.js"}],"styles":[{"type":"external","src":"/_astro/index.C4dB-f6q.css"},{"type":"inline","content":":root{color-scheme:light dark;scroll-behavior:smooth;--primary-color: #10171D;--secondary-color: #21C195;--terciary-color: #1A2127;--cuartiary-color: #1D252C;--rojo-color: #EB0400;--text-color-primary: #FFFFFF;--text-color-secondary: #8B8C91;--text-color-terciary: #10171D}html{font-family:montserrat,system-ui,sans-serif;background:var(--primary-color)}::-webkit-scrollbar{display:none}\n"}],"routeData":{"route":"/proyecto1","isIndex":false,"type":"page","pattern":"^\\/proyecto1\\/?$","segments":[[{"content":"proyecto1","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/proyecto1.astro","pathname":"/proyecto1","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.B8e_A8KY.js"}],"styles":[{"type":"external","src":"/_astro/index.C4dB-f6q.css"},{"type":"inline","content":":root{color-scheme:light dark;scroll-behavior:smooth;--primary-color: #10171D;--secondary-color: #21C195;--terciary-color: #1A2127;--cuartiary-color: #1D252C;--rojo-color: #EB0400;--text-color-primary: #FFFFFF;--text-color-secondary: #8B8C91;--text-color-terciary: #10171D}html{font-family:montserrat,system-ui,sans-serif;background:var(--primary-color)}::-webkit-scrollbar{display:none}\n"}],"routeData":{"route":"/proyecto2","isIndex":false,"type":"page","pattern":"^\\/proyecto2\\/?$","segments":[[{"content":"proyecto2","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/proyecto2.astro","pathname":"/proyecto2","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.B8e_A8KY.js"}],"styles":[{"type":"external","src":"/_astro/index.C4dB-f6q.css"},{"type":"inline","content":":root{color-scheme:light dark;scroll-behavior:smooth;--primary-color: #10171D;--secondary-color: #21C195;--terciary-color: #1A2127;--cuartiary-color: #1D252C;--rojo-color: #EB0400;--text-color-primary: #FFFFFF;--text-color-secondary: #8B8C91;--text-color-terciary: #10171D}html{font-family:montserrat,system-ui,sans-serif;background:var(--primary-color)}::-webkit-scrollbar{display:none}\n"}],"routeData":{"route":"/proyecto3","isIndex":false,"type":"page","pattern":"^\\/proyecto3\\/?$","segments":[[{"content":"proyecto3","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/proyecto3.astro","pathname":"/proyecto3","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.B8e_A8KY.js"}],"styles":[{"type":"external","src":"/_astro/index.C4dB-f6q.css"},{"type":"inline","content":":root{color-scheme:light dark;scroll-behavior:smooth;--primary-color: #10171D;--secondary-color: #21C195;--terciary-color: #1A2127;--cuartiary-color: #1D252C;--rojo-color: #EB0400;--text-color-primary: #FFFFFF;--text-color-secondary: #8B8C91;--text-color-terciary: #10171D}html{font-family:montserrat,system-ui,sans-serif;background:var(--primary-color)}nav{position:sticky;top:0}::-webkit-scrollbar{display:none}[data-title]:hover:after{opacity:1;transition:all .1s ease .5s;visibility:visible}[data-title]:after{content:attr(data-title);background-color:#4d4d4d;color:#fff;font-size:14px;font-family:montserrat,system-ui,sans-serif;position:absolute;padding:7px 20px;bottom:-3.5em;white-space:nowrap;opacity:0;z-index:99999;visibility:hidden;border-radius:5px}[data-title]{position:relative}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/juanqxk/Documentos/Programacion/Frontend/juanqx-portafolio/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/juanqxk/Documentos/Programacion/Frontend/juanqx-portafolio/src/pages/proyecto1.astro",{"propagation":"none","containsHead":true}],["/home/juanqxk/Documentos/Programacion/Frontend/juanqx-portafolio/src/pages/proyecto2.astro",{"propagation":"none","containsHead":true}],["/home/juanqxk/Documentos/Programacion/Frontend/juanqx-portafolio/src/pages/proyecto3.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_CLYrdKUy.mjs","/src/pages/proyecto2.astro":"chunks/pages/proyecto2_DlYS_PKP.mjs","/src/pages/proyecto3.astro":"chunks/pages/proyecto3_Cjj-0UVs.mjs","\u0000@astrojs-manifest":"manifest_BggO1MO8.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_C2AotMml.mjs","\u0000@astro-page:src/pages/proyecto1@_@astro":"chunks/proyecto1_D3o1w_P5.mjs","\u0000@astro-page:src/pages/proyecto2@_@astro":"chunks/proyecto2_D7_6sGn4.mjs","\u0000@astro-page:src/pages/proyecto3@_@astro":"chunks/proyecto3_DkxvxcMr.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index__CL27RzI.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.B8e_A8KY.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/montserrat-cyrillic-wght-normal.CHYi_LmU.woff2","/_astro/montserrat-latin-wght-normal.BDA6280a.woff2","/_astro/montserrat-latin-ext-wght-normal.BIVePy9u.woff2","/_astro/montserrat-cyrillic-ext-wght-normal.rV1oiNxr.woff2","/_astro/montserrat-vietnamese-wght-normal.BXWSX9tz.woff2","/_astro/index.C4dB-f6q.css","/CV_JuanAntonioCuCauich_DesarrolladorFullstack.pdf","/flechaAtras.png","/fotomia.png","/githubProyect.png","/githubSobremi.png","/graduacionLogo.png","/imgHeader.png","/imgLogo.png","/linkedinSobremi.png","/red.png","/tecnmLogo.png","/verificado.png","/_astro/hoisted.B8e_A8KY.js","/proyectos/API-REST.png","/proyectos/BicRent.png","/proyectos/equirent.png","/proyectos/equirentGrande1.png","/proyectos/equirentGrande2.png","/proyectos/tecnmApp.png","/proyectos/tecnmGrande1.png","/techs/angular.png","/techs/astro.png","/techs/css.png","/techs/express.png","/techs/figma.png","/techs/git.png","/techs/github.png","/techs/html.png","/techs/intellij.png","/techs/java.png","/techs/js.png","/techs/linux.png","/techs/mongo.png","/techs/mys.png","/techs/nestjs.png","/techs/node.png","/techs/react.png","/techs/spring.png","/techs/tailw.png","/techs/vscode.png"],"buildFormat":"directory","checkOrigin":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
