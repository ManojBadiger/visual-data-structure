import { useEffect, useRef, useState } from "react";
import { Tooltip, InfoTooltip } from "../../components/tooltip";

interface AlgorithmNavigationProps {
  onPush: () => void;
  onPop: () => void;
  onPushFront: () => void;
  onPopFront: () => void;
  onReverse: () => void;
  onClear: () => void;
  onRemove: () => void;
  onInsertAfter: (targetValue: number, valueToInsert: number) => void;
  onAddMultipleValues: (values: number[]) => void;
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
}

function useTooltips() {
  useEffect(() => {
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    const tooltipList = tooltipTriggerList.map(
      (el) => new Tooltip(el as HTMLElement)
    );

    return () => {
      tooltipList.forEach((tooltip) => tooltip.dispose());
    };
  }, []);
}

export function AlgorithmNavigation({
  onPush,
  onPop,
  onPushFront,
  onPopFront,
  onReverse,
  onInsertAfter,
  onClear,
  onRemove,
  onAddMultipleValues,
  userInput,
  setUserInput,
}: AlgorithmNavigationProps) {
  const arrayInputRef = useRef<HTMLInputElement>(null);
  const [targetValue, setTargetValue] = useState<number | undefined>(undefined);
  const [valueToInsert, setValueToInsert] = useState<number | undefined>(undefined);

  useTooltips();

  const handleAddMultipleValues = () => {
    const input = arrayInputRef.current?.value.trim();
    if (input) {
      const values = input.split(",").map((v) => parseFloat(v.trim()));
      if (values.every((v) => !isNaN(v))) {
        onAddMultipleValues(values);
      } else {
        alert("Please enter valid numbers separated by commas.");
      }
    } else {
      alert("Input is required. Enter numbers separated by commas.");
    }
  };

  const handleInsertAfter = () => {
    if (targetValue !== undefined && valueToInsert !== undefined) {
      onInsertAfter(targetValue, valueToInsert);
    } else {
      alert("Both fields must contain valid numbers.");
    }
  };

  return (
    <div className="gap-2 d-flex flex-column justify-content-center">
      <div className="d-flex">
        <div className="input-group">
          <button type="button" className="btn btn-warning border border-dark">
            Type
          </button>
          <select
            className="border border-black form-select"
            id="inputGroupSelect01"
            disabled
          >
            <option value="singly-ll">Singly</option>
            <option value="doubly-ll">Doubly</option>
            <option value="circular-ll">Circular</option>
          </select>
        </div>
        <InfoTooltip text="Select the type of linked list you would like to construct" />
      </div>
      <hr />
      <nav className="gap-2 d-flex flex-column">
        <div className="input-group w-80">
          <button
            className="w-50 btn btn-secondary border border-dark"
            onClick={handleAddMultipleValues}
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title="Enter integers separated by commas."
          >
            Insert Array
          </button>
          <input
            ref={arrayInputRef}
            className="w-30 form-control border border-dark"
            type="text"
            placeholder="E.g., 1, 2, 3"
          />
        </div>
        <input
          className="form-control border-dark"
          type="number"
          placeholder="Enter an element"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Insert at Start/End or Remove an element."
        />
        <div className="d-flex gap-3">
          <button
            className="btn btn-outline-success p-2 flex-fill"
            onClick={onPush}
          >
            Push End
          </button>
          <button
            className="btn btn-outline-success p-2 flex-fill"
            onClick={onPushFront}
          >
            Push Start
          </button>
        </div>
        <button className="btn btn-outline-danger" onClick={onRemove}>
          Remove
        </button>
        <hr />
        <div className="d-flex gap-3">
        <input
          className="form-control border-dark"
          type="number"
          placeholder="Target"
          value={targetValue}
          onChange={(e) => setTargetValue(e.target.value)}
        />
        <input
          className="form-control border-dark"
          type="number"
          placeholder="Data"
          value={valueToInsert}
          onChange={(e) => setValueToInsert(e.target.value)}
        />
        </div>
        <button
          className="btn btn-outline-success"
          onClick={handleInsertAfter}
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Insert after Target."
        >
          Insert After
        </button>
        <hr />
        <button className="btn btn-outline-primary" onClick={onReverse}>
          Reverse
        </button>
        <div className="d-flex gap-3">
          <button
            className="btn btn-outline-danger p-2 flex-fill"
            onClick={onPop}
          >
            Pop End
          </button>
          <button
            className="btn btn-outline-danger p-2 flex-fill"
            onClick={onPopFront}
          >
            Pop Start
          </button>
        </div>
        <button className="btn btn-outline-danger" onClick={onClear}>
          Erase Linked List
        </button>
      </nav>
    </div>
  );
}
