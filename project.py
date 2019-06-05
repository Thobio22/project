import pandas as pd
import numpy as np
import json


def clean(dataframe):
    """This cleans away unnecessary data columns and invalid/empty values"""

    dataframe = dataframe[["Year", "State", "Data Item", "Value"]]

    dataframe["Value"] = dataframe["Value"].str.replace(",", "")

    

    # dataframe["Value"] = pd.to_numeric(dataframe["Value"])


    # for i in dataframe["Value"]:
    #     if i > 999:
    #         print(i)

    return dataframe


def convert2json(dataframe):
    """This converts the given dataframe to a .json file"""
    jsonFile = dataframe.to_json('appel_data.json', orient="records")




if __name__ == "__main__":

    # read data into pandas dataframe
    dataframe = pd.read_csv("Datasets/appel_data.csv", delimiter=";")

    # clean up the data
    dataframe = clean(dataframe)

    convert2json(dataframe)
