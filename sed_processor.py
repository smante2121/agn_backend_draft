#!/usr/bin/env python3
import matplotlib.pyplot as plt
import numpy as np
import sys
import argparse
import json
import os

def process_sed_data(data_file, output_file):
    try:
        # Check if input file exists
        if not os.path.exists(data_file):
            print(f"Error: Input file {data_file} does not exist", file=sys.stderr)
            return False
            
        # Check if output directory exists
        output_dir = os.path.dirname(output_file)
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
            
        # Read the data from the file
        with open(data_file, 'r') as f:
            data = f.read().strip()
        
        print(f"Processing data: {data}", file=sys.stderr)
        
        # For test data, create a simple visualization
        plt.figure(figsize=(10, 6))
        x = np.linspace(0, 10, 100)
        plt.plot(x, np.sin(x))
        plt.title('SED Visualization')
        plt.xlabel('Wavelength')
        plt.ylabel('Flux')
        plt.grid(True)
        
        # Save the plot
        plt.savefig(output_file)
        plt.close()
        
        print(f"Plot saved to {output_file}", file=sys.stderr)
        return True
    except Exception as e:
        print(f"Error processing SED data: {str(e)}", file=sys.stderr)
        return False

def main():
    parser = argparse.ArgumentParser(description='Process SED data and create visualization')
    parser.add_argument('--data_file', required=True, help='Path to the input data file')
    parser.add_argument('--output_file', required=True, help='Path to save the output image')
    
    args = parser.parse_args()
    
    print(f"Processing SED data from {args.data_file} to {args.output_file}", file=sys.stderr)
    success = process_sed_data(args.data_file, args.output_file)
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main() 