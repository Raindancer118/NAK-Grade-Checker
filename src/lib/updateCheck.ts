import localVersion from '../../version.json';

const REMOTE_VERSION_URL = 'https://raw.githubusercontent.com/Raindancer118/NAK-Grade-Checker/refs/heads/main/version.json';

export interface UpdateCheckResult {
    updateAvailable: boolean;
    latestVersion: string;
    currentVersion: string;
}

function parseVersion(version: string): number[] {
    return version.split('.').map(Number);
}

function isNewer(remote: string, local: string): boolean {
    const remoteParts = parseVersion(remote);
    const localParts = parseVersion(local);

    for (let i = 0; i < Math.max(remoteParts.length, localParts.length); i++) {
        const r = remoteParts[i] || 0;
        const l = localParts[i] || 0;
        if (r > l) return true;
        if (r < l) return false;
    }
    return false;
}

export async function checkForUpdate(): Promise<UpdateCheckResult> {
    const currentVersion = localVersion.version;
    try {
        const response = await fetch(REMOTE_VERSION_URL);
        if (!response.ok) {
            console.error('Failed to fetch remote version:', response.statusText);
            return { updateAvailable: false, latestVersion: currentVersion, currentVersion };
        }
        const data = await response.json();
        const latestVersion = data.version;

        if (isNewer(latestVersion, currentVersion)) {
            return { updateAvailable: true, latestVersion, currentVersion };
        }
    } catch (error) {
        console.error('Error checking for updates:', error);
    }

    return { updateAvailable: false, latestVersion: currentVersion, currentVersion };
}
