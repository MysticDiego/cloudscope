"use strict";

// Menú de navegación: eventos, condicionales y manipulación de clases del DOM.
document.documentElement.classList.add("js");

const menuButton = document.getElementById("menu-toggle");
const navigation = document.getElementById("site-nav");

function closeMenu(restoreFocus) {
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.querySelector(".menu-label").textContent = "Menú";

  if (restoreFocus) {
    menuButton.focus();
  }
}

if (menuButton && navigation) {
  menuButton.hidden = false;

  menuButton.addEventListener("click", function () {
    const isOpen = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.querySelector(".menu-label").textContent = isOpen ? "Cerrar" : "Menú";
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && navigation.classList.contains("is-open")) {
      closeMenu(true);
    }
  });

  document.addEventListener("click", function (event) {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) {
      closeMenu(false);
    }
  });

  navigation.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      closeMenu(false);
    }
  });

  // Evita conservar un menú abierto al cambiar entre móvil y escritorio.
  window.matchMedia("(min-width: 901px)").addEventListener("change", function () {
    closeMenu(false);
  });
}

// Comparador: objetos, arreglos, funciones, eventos y un ciclo forEach.
const serviceModels = {
  iaas: {
    code: "IaaS",
    title: "Tú construyes sobre la infraestructura.",
    description: "El proveedor entrega cómputo, almacenamiento y red. Tú administras el sistema operativo, el entorno de ejecución y tu aplicación. Obtienes flexibilidad y asumes más tareas de mantenimiento.",
    example: "Un equipo instala su aplicación y configura Linux en una máquina virtual de Amazon EC2 o Azure Virtual Machines.",
    focus: "Más control sobre la configuración; más trabajo de administración.",
    customerLayers: 3
  },
  paas: {
    code: "PaaS",
    title: "Tú programas. La plataforma se encarga de la base.",
    description: "El proveedor administra la infraestructura, el sistema operativo y el entorno de ejecución. Tú desarrollas y configuras tu aplicación, y gestionas sus datos y permisos.",
    example: "Un equipo despliega una aplicación web en Azure App Service sin administrar el sistema operativo del servidor.",
    focus: "Más atención al desarrollo; menos administración de infraestructura.",
    customerLayers: 1
  },
  saas: {
    code: "SaaS",
    title: "La aplicación está lista para usarse.",
    description: "El proveedor opera la aplicación y su plataforma. Tú utilizas sus funciones y administras aspectos como cuentas, acceso y configuración. Los datos y su uso siguen requiriendo cuidado.",
    example: "Un equipo utiliza una aplicación de correo web o colaboración sin instalar ni mantener sus servidores.",
    focus: "Acceso a una solución lista; menor capacidad de modificar su funcionamiento.",
    customerLayers: 0
  }
};

const modelSelect = document.getElementById("service-model");
const resetButton = document.getElementById("reset-comparison");

function showModel(modelKey) {
  const model = serviceModels[modelKey];

  // Una selección no reconocida conserva el contenido actual.
  if (!model) {
    return;
  }

  document.getElementById("model-code").textContent = model.code;
  document.getElementById("model-title").textContent = model.title;
  document.getElementById("model-description").textContent = model.description;
  document.getElementById("model-example").textContent = model.example;
  document.getElementById("model-focus").textContent = model.focus;

  const layers = document.querySelectorAll(".stack-row[data-layer]");

  layers.forEach(function (layer, index) {
    const isCustomer = index < model.customerLayers;
    layer.dataset.owner = isCustomer ? "tu" : "proveedor";
    layer.querySelector(".layer-owner").textContent = isCustomer ? "Tú administras" : "Proveedor";
  });

  document.getElementById("compare-feedback").textContent = "Modelo seleccionado: " + model.code + ". Puedes cambiarlo cuando quieras.";
}

if (modelSelect && resetButton) {
  document.getElementById("compare-controls").hidden = false;
  document.getElementById("comparison-fallback").hidden = true;

  modelSelect.addEventListener("change", function () {
    showModel(modelSelect.value);
  });

  resetButton.addEventListener("click", function () {
    modelSelect.value = "iaas";
    showModel("iaas");
    document.getElementById("compare-feedback").textContent = "Comparador restablecido a IaaS. Puedes elegir otro modelo.";
    modelSelect.focus();
  });
}
