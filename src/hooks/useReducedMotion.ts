"use client";

import { useSyncExternalStore } from "react";

// Device limitation detection cache - computed once
let deviceLimitationsCache: boolean | null = null;

function getDeviceLimitations(): boolean {
  if (typeof window === "undefined") return false;
  
  if (deviceLimitationsCache !== null) {
    return deviceLimitationsCache;
  }

  // Check for Safari on iOS (known to have IntersectionObserver issues)
  const isSafariIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !("MSStream" in window);

  // Check for low-end device hints
  const nav = navigator as Navigator & { deviceMemory?: number };
  const isLowEndDevice = nav.deviceMemory !== undefined && nav.deviceMemory < 4;

  // hardwareConcurrency is widely supported
  const hasLowCPU = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4;

  deviceLimitationsCache = isSafariIOS || isLowEndDevice || hasLowCPU;
  return deviceLimitationsCache;
}

/**
 * Detect prefers-reduced-motion using useSyncExternalStore
 */
function getReducedMotionSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches || getDeviceLimitations();
}

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Detects if user prefers reduced motion or is on a low-end device.
 * Returns true if animations should be reduced/disabled.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );
}

// Low-end device detection cache
let lowEndDeviceCache: boolean | null = null;

function getLowEndDeviceSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  
  if (lowEndDeviceCache !== null) {
    return lowEndDeviceCache;
  }

  // Touch device without hover capability
  const isTouchOnly = window.matchMedia(
    "(hover: none) and (pointer: coarse)"
  ).matches;

  // Check device memory (if available)
  const nav = navigator as Navigator & { deviceMemory?: number };
  const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 4;

  // Check CPU cores
  const lowCPU =
    navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4;

  // Safari iOS detection
  const isSafariIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !("MSStream" in window);

  // Android WebView or low-end Android detection
  const isLowEndAndroid =
    /Android/.test(navigator.userAgent) &&
    (/POCO|Redmi|Realme|OPPO|Vivo/i.test(navigator.userAgent) || lowMemory || lowCPU);

  lowEndDeviceCache = isTouchOnly && (lowMemory || lowCPU || isSafariIOS || isLowEndAndroid);
  return lowEndDeviceCache;
}

function subscribeToLowEndDevice() {
  // No subscription needed - device capabilities don't change
  return () => {};
}

/**
 * Detects if the device is likely a low-end mobile device.
 */
export function useIsLowEndDevice(): boolean {
  return useSyncExternalStore(
    subscribeToLowEndDevice,
    getLowEndDeviceSnapshot,
    getServerSnapshot
  );
}

/**
 * Returns optimized Framer Motion transition settings based on device capability.
 */
export function useOptimizedTransition() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return {
      duration: 0.1,
      ease: "linear" as const,
    };
  }

  return {
    duration: 0.5,
    ease: "easeOut" as const,
  };
}
