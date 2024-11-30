import json
import matplotlib.pyplot as plt
import numpy as np

logged = {}

with open('fileTransferLogs.json', 'r') as file:
    logs = json.load(file)

for log in logs:
    for key, value in log.items():
        if key not in logged:
            logged[key] = []
        logged[key].append(value)

durations = logged['duration']
speeds = logged['speed']
sizes = logged['size']

durations_in_seconds = [duration / 1000 for duration in durations]
sizes_in_mb =[size / (1024 * 1024) for size in sizes]
speeds_in_mb = [speed / (1024 * 1024) for speed in speeds]

avg_duration = sum(durations) / len(durations)
avg_speed = sum(speeds_in_mb) / len(speeds_in_mb)
avg_size = sum(sizes_in_mb) / len(sizes_in_mb)



fig, axs = plt.subplots(3, 1, figsize=(10, 15))

axs[0].bar(range(len(durations)), durations, color='skyblue')
axs[0].axhline(avg_duration, color='red', linestyle='--', label=f'Avg Duration: {avg_duration:.2f} ms')
axs[0].set_xlabel('File Index')
axs[0].set_ylabel('Duration (ms)')
axs[0].set_title('File Transfer Duration')

axs[1].bar(range(len(sizes_in_mb)), sizes_in_mb, color='lightgreen')
axs[1].axhline(avg_size, color='red', linestyle='--', label=f'Avg Size: {avg_size:.2f} MB')
axs[1].set_xlabel('File Index')
axs[1].set_ylabel('Size (MB)')
axs[1].set_title('File Size in MB')

axs[2].bar(range(len(speeds_in_mb)), speeds_in_mb, color='salmon')
axs[2].axhline(avg_speed, color='red', linestyle='--', label=f'Avg Speed: {avg_speed:.2f} KB/s')
axs[2].set_xlabel('File Index')
axs[2].set_ylabel('Speed (KB/s)')
axs[2].set_title('File Transfer Speed')

plt.tight_layout()
plt.savefig('fileTransferLogs.png')

plt.figure(figsize=(10, 5))
plt.scatter(sizes_in_mb, durations_in_seconds, color='purple')

coeffs = np.polyfit(sizes_in_mb, durations_in_seconds, 1)
poly = np.poly1d(coeffs)

plt.plot(sizes_in_mb, poly(sizes_in_mb), color='red', linestyle='--', label=f'Best Fit Line: {coeffs[0]:.2f}x + {coeffs[1]:.2f}')
plt.xlabel('File Size (MB)')
plt.ylabel('Download Time (seconds)')
plt.title('File Size vs Download Time')
plt.legend()

plt.tight_layout()
plt.savefig('fileTransferPlot.png')