import { useCallback } from 'react';
import { useRadarStore } from '@/stores/radar-store';
import { scanCompleteRadarProfile } from '@/lib/github-api';
import { parseSpacePilotInput, getRadarErrorMessage } from '@/lib/utils';
import type { RadarProfile } from '@/types';

interface UseRadarScanReturn {
  scanPilot: (input: string) => Promise<RadarProfile | null>;
  isScanning: boolean;
  error: string | null;
  lastScannedPilot: string | null;
}

export function useRadarScan(): UseRadarScanReturn {
  const {
    loadingStates,
    lastScannedPilot,
    initiateScan,
    setScanning,
    setRadarError,
    updateRadarProfile,
    resetRadar,
  } = useRadarStore();

  const scanPilot = useCallback(async (input: string): Promise<RadarProfile | null> => {
    try {
      // Parse and validate input
      const username = parseSpacePilotInput(input);
      if (!username) {
        setRadarError('Invalid space pilot identifier! Please enter a valid GitHub username or URL. 🚀');
        return null;
      }

      // Start scanning process
      initiateScan(username);

      console.log(`🛸 Initiating radar scan for: ${username}`);

      // Perform the complete scan
      const profile = await scanCompleteRadarProfile(username);

      // Update store with results
      updateRadarProfile(profile);
      setScanning(false);
      setRadarError(null);

      console.log('✅ Radar scan completed successfully!');
      return profile;

    } catch (error: any) {
      console.error('❌ Radar scan failed:', error);
      
      const errorMessage = getRadarErrorMessage(error);
      setRadarError(errorMessage);
      setScanning(false);
      
      return null;
    }
  }, [initiateScan, setScanning, setRadarError, updateRadarProfile]);

  return {
    scanPilot,
    isScanning: loadingStates.isScanning,
    error: loadingStates.error,
    lastScannedPilot,
  };
}