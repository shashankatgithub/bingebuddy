import BackgroundFetch from 'react-native-background-fetch';

const performMaintenance = async (taskId) => {
  console.log('Performing MMKV maintenance...');
  //purgeOldData();
  //manageStorage();

  // Signal completion
  BackgroundFetch.finish(taskId);
};

// Configure background fetch
BackgroundFetch.configure(
  {
    minimumFetchInterval: 1440, // 24 hours (in minutes)
    //minimumFetchInterval: 15, // 15 minutes
    //stopOnTerminate: false, // Continue tasks after app termination
    //startOnBoot: true, // Start tasks after device reboot
  },
  async (taskId) => {
    console.log('Background fetch triggered:', taskId);
    await performMaintenance(taskId);
    //await syncToServer(); // Perform sync
   // BackgroundFetch.finish(taskId);
  },
  (error) => {
    console.error('Background fetch failed to start:', error);
  }
);

// Optional: Stop background fetch when no longer needed
const stopBackgroundFetch = () => {
  BackgroundFetch.stop();
};
