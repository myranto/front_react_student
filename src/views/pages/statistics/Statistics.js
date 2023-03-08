import React, { useEffect, useState } from 'react'
import { getAuctionsStats, getSalesStats, getTurnoverStats } from 'database/Api'
import { CCard, CCardBody, CCol, CRow, CWidgetStatsA } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'

const Statistics = () => {
  const [salesStats, setSalesStats] = useState(undefined)
  const [auctionsStats, setAuctionsStats] = useState(undefined)
  let widgets = []
  let salesLineChartData = undefined
  let auctionsChartData = undefined
  if (salesStats && auctionsStats) {
    widgets = [
      {
        title: "Chiffre d'affaire total",
        value: `${salesStats.totalSales.toLocaleString('fr-FR', {
          minimumFractionDigits: 2,
        })} Ar`,
        color: 'success',
      },
      {
        title: 'Commission moyenne par enchère',
        value: `${(salesStats.commisionAverage ?? 0).toLocaleString('fr-FR', {
          minimumFractionDigits: 2,
        })} Ar`,
        color: 'info',
      },
      {
        title: "Nombre total d'enchère concluses",
        value: auctionsStats.totalAuctionFinished,
        color: 'info',
      },
      {
        title: 'Enchère la plus basse',
        value: `${(auctionsStats.leastValuableAuction.topBid?.amount ?? 0).toLocaleString('fr-FR', {
          minimumFractionDigits: 2,
        })} Ar`,
        color: 'warning',
      },
      {
        title: 'Echère la plus haute',
        value: `${(auctionsStats.mostValuableAuction.topBid?.amount ?? 0).toLocaleString('fr-FR', {
          minimumFractionDigits: 2,
        })} Ar`,
        color: 'success',
      },
    ]
    salesLineChartData = {
      labels: salesStats.dailySales.map((data) => data.date),
      data: salesStats.dailySales.map((data) => data.turnover),
    }
    auctionsChartData = {
      labels: auctionsStats.dailyAuctionStat.map((data) => data.date),
      data: [
        auctionsStats.dailyAuctionStat.map((data) => data.started),
        auctionsStats.dailyAuctionStat.map((data) => data.ended),
      ],
    }
  }
  const lineChartBaseOption = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
  }
  useEffect(() => {
    getTurnoverStats()
      .then((data) => {
        setSalesStats(data)
      })
      .catch((error) => console.log(error))
    getAuctionsStats().then((data) => {
      setAuctionsStats(data)
    })
  }, [])
  return (
    <>
      <CRow>
        {salesStats &&
          auctionsStats &&
          widgets.map((widget) => {
            return (
              <>
                <CCol sm={6} lg={3}>
                  <CWidgetStatsA
                    className="mb-4"
                    color={widget.color}
                    value={widget.value}
                    title={widget.title}
                  />
                </CCol>
              </>
            )
          })}
      </CRow>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 className="card-title mb-0">Chiffre d&apos;affaire journalier</h4>
            </CCol>
          </CRow>
          <CRow>
            {salesLineChartData && (
              <CChartLine
                style={{ height: '300px', marginTop: '40px' }}
                data={{
                  labels: salesLineChartData.labels,
                  datasets: [
                    {
                      label: 'Ventes journalieres',
                      backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                      borderColor: getStyle('--cui-info'),
                      pointHoverBackgroundColor: getStyle('--cui-info'),
                      borderWidth: 2,
                      data: salesLineChartData.data,
                    },
                  ],
                }}
                options={lineChartBaseOption}
              />
            )}
          </CRow>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 className="card-title mb-0">Enchères d&apos;affaire journalier</h4>
            </CCol>
          </CRow>
          <CRow>
            {auctionsChartData && (
              <CChartLine
                style={{ height: '300px', marginTop: '40px' }}
                data={{
                  labels: auctionsChartData.labels,
                  datasets: [
                    {
                      label: 'Créée',
                      backgroundColor: hexToRgba(getStyle('--cui-purple'), 10),
                      borderColor: getStyle('--cui-purple'),
                      pointHoverBackgroundColor: getStyle('--cui-purple'),
                      borderWidth: 2,
                      data: auctionsChartData.data[0],
                    },
                    {
                      label: 'Terminé',
                      backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                      borderColor: getStyle('--cui-info'),
                      pointHoverBackgroundColor: getStyle('--cui-info'),
                      borderWidth: 2,
                      data: auctionsChartData.data[1],
                    },
                  ],
                }}
                options={lineChartBaseOption}
              />
            )}
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Statistics
