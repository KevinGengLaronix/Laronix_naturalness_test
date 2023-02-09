import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from pathlib import Path
import pdb

result_dir = "./results"

csvs = sorted(Path(result_dir).glob("**/*.csv"))

datalist = []
for x in csvs:
    tmp = pd.read_csv(x, header=0)
    datalist.append(tmp)

dataset = pd.concat(datalist, ignore_index=False)

means = dataset.groupby("Method").mean()['Nat'].values
std = np.squeeze(dataset.groupby("Method").std().values)
id = [x.split("-")[0]  for x in dataset.groupby("Method").mean().index]
# pdb.set_trace()
print("\n-----Mean-----\n")
print(dataset.groupby("Method").mean())
print("----------")
print("\n-----Standard Error-----\n")
print(dataset.groupby("Method").std())
print("----------")
# plot
plt.bar(x=id, height=means, yerr=std, align="center", ecolor="r", capsize=0.5, alpha=0.5)
plt.xlabel("Voices")
plt.ylabel("MOS")
plt.title("MOS Score with STD")
plt.savefig("./results/nat.png")

print("Check results/nat.png for more details")
print("Finished")