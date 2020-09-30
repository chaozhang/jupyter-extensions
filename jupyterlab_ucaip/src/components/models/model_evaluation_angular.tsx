import { LinearProgress, Grid } from '@material-ui/core';
import * as React from 'react';
import { Model, ModelService, ModelEvaluation } from '../../service/model';

interface Props {
  model: Model;
  value: number;
  index: number;
}

function convertConfusionMatrixData(confusionMatrix) {
  const result = [];

  for (let i = 1; i < confusionMatrix.length; i++) {
    const name = confusionMatrix[0][i - 1];
    const totalExamples = confusionMatrix[i].reduce(function(a, b) {
      return a + b;
    }, 0);
    const truePositivesAboveThreshold = confusionMatrix[i][i - 1];
    const confusedLabels = [];

    for (let j = 0; j < confusionMatrix[i].length; j++) {
      if (j === i - 1) continue;

      if (confusionMatrix[i][j] === 0) continue;

      confusedLabels.push({
        name: confusionMatrix[0][j],
        confusionInstances: confusionMatrix[i][j],
      });
    }

    result.push({
      name: name,
      totalExamples: totalExamples,
      truePositivesAboveThreshold: truePositivesAboveThreshold,
      truePositivesBelowThreshold: 0,
      confusedLabels: confusedLabels,
    });
  }

  return result;
}

function convertEvaluationData(modelEvaluation) {
  const confidenceMetrics = modelEvaluation.confidenceMetrics.map(function(
    metrics
  ) {
    return {
      confidenceThreshold: metrics.confidenceThreshold / 100,
      precision: metrics.precision,
      recall: metrics.recall,
    };
  });

  return {
    auPrc: modelEvaluation.auPrc,
    logLoss: modelEvaluation.logLoss,
    createTime: modelEvaluation.createTime.toLocaleString(),
    confidenceMetrics: confidenceMetrics,
  };
}

interface State {
  hasLoaded: boolean;
  isLoading: boolean;
  modelEvaluation: ModelEvaluation;
  confusionMatrix: any[];
}

export class EvaluationTableAngular extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasLoaded: false,
      isLoading: false,
      modelEvaluation: null,
      confusionMatrix: [],
    };
  }

  private angularElementRef: any = React.createRef();

  async componentDidMount() {
    await this.getModelEvaluations();

    const demoScript: any = document.querySelector('#demo');

    if (demoScript) {
      demoScript.onload = this.updateAngularConfusionMatrix.bind(this);
    }

    this.updateAngularConfusionMatrix();
  }

  private updateAngularConfusionMatrix() {
    if (this.angularElementRef && this.state.modelEvaluation) {
      this.angularElementRef.current.labelsAnalysis = convertConfusionMatrixData(
        this.state.confusionMatrix
      );
      this.angularElementRef.current.evaluation = convertEvaluationData(
        this.state.modelEvaluation
      );
    }
  }

  private async getModelEvaluations() {
    try {
      this.setState({ isLoading: true });

      const modelEvaluation = await ModelService.getModelEvaluation(
        this.props.model.id
      );

      this.setState({
        hasLoaded: true,
        modelEvaluation: modelEvaluation,
        confusionMatrix: modelEvaluation.confusionMatrix,
      });
    } catch (err) {
      console.warn('Error retrieving model evaluations', err);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div
        hidden={this.props.value !== this.props.index}
        style={{ marginTop: '16px' }}
      >
        {isLoading ? (
          <LinearProgress />
        ) : (
          <Grid
            container
            style={{ margin: '0px', padding: '0 24px 24px', width: '100%' }}
            spacing={3}
            direction="column"
          >
            <confusion-matrix-element
              ref={this.angularElementRef}
            ></confusion-matrix-element>
          </Grid>
        )}
      </div>
    );
  }
}
