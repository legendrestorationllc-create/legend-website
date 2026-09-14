/**
 * Iconos del paso 1, dibujados a la medida (no hay emoji de techo ni de siding de vinil).
 * Aprobados por Daniel el 14-sep-2026: techo = casita con el techo mandando ·
 * siding = la fachada con las paredes de vinil · ventana = marco blanco con vidrio azul.
 */
export const SERVICE_ICON: Record<string, string> = {
  roof: `<rect x="11" y="27" width="26" height="14" rx="1.5" fill="#F0E2C8"/><rect x="20" y="31" width="8" height="10" rx="1" fill="#9BA7C4"/><rect x="33" y="8" width="5" height="9" rx="1" fill="#8D5A3B"/><path d="M24 4 47 27H1z" fill="#C0472B"/><path d="M12 20h24M6.5 26.5h35" stroke="#E86A4E" stroke-width="2" stroke-linecap="round"/><path d="M24 4 47 27h-6L24 10z" fill="#A23A22"/>`,
  siding: `<path d="M24 5 45 20H3z" fill="#AEB6C7"/><path d="M24 5 45 20h-5L24 9z" fill="#98A1B4"/><rect x="7" y="19" width="34" height="23" rx="1.5" fill="#79B4DE"/><path d="M7 25h34M7 31h34M7 37h34" stroke="#4E93C4" stroke-width="2.1"/><rect x="7" y="19" width="4.5" height="23" fill="#FFFFFF"/><rect x="36.5" y="19" width="4.5" height="23" fill="#5FA0CE"/><rect x="14" y="24" width="8.5" height="8.5" rx="1" fill="#DCEBF7" stroke="#fff" stroke-width="1.8"/><rect x="27" y="29" width="8" height="13" rx="1" fill="#8D5A3B" stroke="#fff" stroke-width="1.5"/><rect x="7" y="19" width="34" height="23" rx="1.5" fill="none" stroke="#3E7FAF" stroke-width="1.5"/>`,
  windows: `<rect x="9" y="8" width="30" height="27" rx="2" fill="#7EC4E8"/><path d="M13 13l9 17M22 12l6 12" stroke="#fff" stroke-width="2.6" opacity=".75" stroke-linecap="round"/><rect x="9" y="8" width="30" height="27" rx="2" fill="none" stroke="#fff" stroke-width="3.5"/><path d="M24 8v27M9 21.5h30" stroke="#fff" stroke-width="3.2"/><rect x="9" y="8" width="30" height="27" rx="2" fill="none" stroke="#5E7391" stroke-width="1.6"/><rect x="5.5" y="36" width="37" height="4" rx="1.4" fill="#E7EEF6" stroke="#5E7391" stroke-width="1.2"/>`,
}
